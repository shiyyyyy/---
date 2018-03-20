const util = require("../../utils/util.js")
const app = getApp()
Page({
  data: {
    res: {},
    resp: {},
    // 返回的数据的产品团期下的开团时间
    moneyCalendar: [],
    // 点击的那天是哪年哪月哪天
    select: {},
    // 选择预订的人数 & 单房差数量 & 成人价
    num: 1,
    // 团期列表的当前下标
    idn: "",
    // 日历 相关
    calendar: {
      // 返回月份0 ~ 11
      'month': new Date().getMonth() + 1,
      // 返回一个月中的某天 1~31
      'date': new Date().getDate(),
      // 返回一周中的某一天 0 ~ 6
      "day": new Date().getDay(),
      // 从 Date 对象以四位数字返回年份
      'year': new Date().getFullYear(),
      // 渲染的数组
      "weeks": []
    },
    // 控制 hidden 显示隐藏(联系人信息)
    name_hidden: true,
    tel_hidden: true
  },

  // 改变 人数 
  ctorNum: function (e) {
    console.log(e)
    var target = e.target.dataset.name

    switch (target) {
      case 'subNum':
        if (this.data.num > 1) {
          console.log("num - 1")
          this.setData({
            num: this.data.num - 1
          })
        }
        break;
      case 'addNum':
        console.log("num + 1")
        this.setData({
          num: this.data.num + 1
        })
        break;
      default:
        console.log("都不对,默认default")
    }
  },

  // 提交订单(表单)事件
  formSubmit: function (e) {
    if (!(this.data.select.date)) {
      wx.showToast({
        title: '请选择出发日期',
        icon: 'none'
      })
      return
    }
    var value = e.detail.value
    console.log(value)
    // 如果没填写联系人信息,不行
    if (!(value.name && value.tel)) {
      // 弹出框 提示用户输入 姓名/电话
      wx.showToast({
        title: '请输入联系人信息',
        icon: 'none'
      })
      return
    }

    util.showLoading()
    // // 联系人信息 传递到 pay 页面
    var gp_id = this.data.res[this.data.idn].id
    var num_of_people = this.data.num
    var pd_name = this.data.resp['产品名称']
    var dep_date = this.data.res[this.data.idn].dep_date
    var back_date = this.data.res[this.data.idn].back_date
    var orderImgUrl0 = this.data.resp['产品图片'][0].path
    var comment = value.textarea || ''
    var contact = value.name || ''
    var mobile = value.tel || ''
    

    wx.setStorageSync("idn", this.data.idn)
    // wx.setStorageSync("info", value)
    // wx.setStorageSync("num", num_of_people)

    getApp().post('api/WxPay/order', {
      'gp_id': gp_id,  // 团的id
      'num_of_people': num_of_people, // 人数
      'comment': comment, // 其他需求
      'contact': contact, // 联系人姓名
      'mobile': mobile, // 电话
      'pd_name': pd_name,
      'dep_date': dep_date,
      'back_date': back_date,
      'orderImgUrl0': orderImgUrl0
    }, data => {
      // ['id','order_num','retail_price','amount']
      // 团id    订单人数    担任金额    总金额
      console.log(data)
      var pd_name = data.pd_name
      var dep_city_name = data.dep_city_name
      var dep_date = data.dep_date
      var back_date = data.back_date
      var amount = data.amount
      var comment = data.comment
      var contact = data.contact
      var order_num = data.order_num
      var mobile = data.mobile
      var orderImgUrl0 = data.orderImgUrl0
      var id = data.id
      wx.navigateTo({
        url: `../pay/pay?pd_name=${pd_name}&dep_city_name=${dep_city_name}&dep_date=${dep_date}&back_date=${back_date}&amount=${amount}&comment=${comment}&contact=${contact}&order_num=${order_num}&mobile=${mobile}&orderImgUrl0=${orderImgUrl0}&id=${id}`
      })
    })
  },

  //  姓名 input 输入验证 失焦事件
  name_input: function (e) {
    var rex = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/
    var userName = e.detail.value
    // 如果 rex.test(userName) 为真,则输入姓名正确
    console.log("name_input失焦-判断输入是否符合")
    if (rex.test(userName)) {
      this.setData({
        name_hidden: true
      })
    } else {
      this.setData({
        name_hidden: false
      })
    }
    console.log(e)
    console.log(this.data.name_hidden)
  },
  // 电话 验证 
  tel_input: function (e) {
    var rex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
    var tel = e.detail.value
    console.log("tel_input失焦-判断输入是否符合")
    if (rex.test(tel)) {
      this.setData({
        tel_hidden: true
      })
    } else {
      this.setData({
        tel_hidden: false
      })
    }
    console.log(this.data.tel_hidden)
  },


  onLoad: function (options) {
    var id = wx.getStorageSync("id")
    var url = 'api/B2C/product/' + id
    getApp().post(url, {}, res => {
      this.setData({
        res: res.groups,
        resp: res.pd_detail
      })
      console.log(res)
      var moneyCalendar = []
      for (var i = 0, len = this.data.res.length; i < len; i++) {
        var starGroupTime = this.changeFormat(this.data.res[i].dep_date)
        starGroupTime.money = this.data.res[i].retail_price
        moneyCalendar.push(starGroupTime)
        this.setData({
          moneyCalendar: moneyCalendar
        })
      }
      console.log(this)
      console.log(this.data.resp['产品图片'][0].path)
    })

    // 页面初始化 options为页面跳转所带来的参数
    if (options.date) {
      var year = options.date.slice(0, 4)
      var month = options.date.slice(5, 7)
      var date = options.date.slice(8)
      console.log(year + "-" + month + "-" + date)
      this.setData({
        "select.year": year,
        "select.month": month,
        "select.date": date,
        idn: options.idn
      })
    } else {
      var _date = new Date()
      var year = _date.getFullYear() + ""  //年
      var month = _date.getMonth() + 1 < 10 ? "0" + (_date.getMonth() + 1) : "" + (_date.getMonth() + 1)  //月
      var date = _date.getDate() < 10 ? "0" + _date.getDate() : "" + _date.getDate()  //日
      var time = `${year}-${month}-${date}`
      console.log(time)
    }

    this.calendarDrawing(year, month, date)


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  // 改变时间格式
  changeFormat: function (date) {
    var timeArr = date.split("-")
    var year = timeArr[0]
    var month = timeArr[1]
    var date = timeArr[2]
    return {
      year: year,
      month: month,
      date: date
    }
  },

  // 改变月份 按钮
  changeMonth: function (e) {
    console.log(this)
    // 获取当前calendar里面的年月日
    var year = this.data.calendar.year   //年
    var month = this.data.calendar.month //月
    var date = this.data.calendar.date   //日

    var target = e.target.dataset.name
    console.log(e)

    // 判断点击目标 改变月份
    if (target === "prev") {
      month = month - 1
      if (month < 1) {
        month = 12
        year = year - 1
      }
    } else if (target === "next") {
      month = month - 0 + 1
      if (month > 12) {
        month = 1
        year = year - 0 + 1
      }
    } else{
      return
    }
    year = year + ''
    month = month < 10 ? '0' + month : month + ''
    this.setData({
      "calendar.month": month
    })
    this.calendarDrawing(year, month, date)
  },


  // 选择 天  按钮
  selectDate: function (e) {
    console.log(e)
    console.log(this)
    // 点击的是哪一天
    var targetDay = e.currentTarget.dataset.date
    console.log(targetDay)
    var year = targetDay.slice(0, 4)
    var month = targetDay.slice(5, 7)
    var date = targetDay.slice(8)
    this.setData({
      "calendar.year": year,
      "calendar.month": month,
      "calendar.date": date
    })
    this.setData({
      "select.year": year,
      "select.month": month,
      "select.date": date
    })
    // 设置当前的 index
    console.log(this.data.res.length)
    var res = this.data.res
    for (var i = 0, len = res.length; i < len; i++) {
      if (res[i].dep_date === targetDay) {
        var idn = i
      }
    }
    console.log(idn)
    // 设置完月份之后,需要把价格同步到 人数 上面
    this.setData({
      idn: idn
    })
  },


  // 日历 渲染函数
  calendarDrawing: function (year, month, date) {
    var _date = new Date()

    console.log(year + "-" + month + "-" + date)
    var day = _date.getDay() // 周几 返回几就是周几, 0 是周日

    // 这个月的第一天 是周几
    var firstDay = new Date(year - 0, month - 1, 1).getDay()
    console.log('本月第一天是周 :' + firstDay)

    // 上个月在本月显示的天数的数组
    var lastMonthDays = [];
    for (var i = firstDay - 1; i >= 0; i--) {
      // 可以用 负的 天 来从本月算到上个月
      console.log(new Date(year - 0, month - 1, -i).getDate())

      // 上个月的 天 倒序
      lastMonthDays.push({
        // 注意: 数组里面不只有天,还有月份,可以用月分可以判断样式,例如字体颜色
        'date': new Date(year - 0, month - 1, -i).getDate(),
        'month': month - 1 < 10 ? "0" + (month - 1) : '' + (month - 1),
        "year": year
      })
    }
    // 本月 天数 数组
    var currentMonthDays = [];
    console.log(new Date(year, month, 0).getDate()) //判断天数(用下个月的0天 返回本月最后一天)
    for (var i = 1, len = new Date(year, month, 0).getDate(); i <= len; i++) {
      currentMonthDays.push({
        'date': i < 10 ? "0" + i : "" + i,
        'month': month,
        "year": year
      })
    }
    // 下月 天数 数组
    var nextMonthDays = []
    var endDay = new Date(year, month, 0).getDay(); //判断本月最后一天星期几
    console.log('本月 最后一天 星期几:' + endDay)
    for (var i = 1; i < 7 - endDay; i++) {
      nextMonthDays.push({
        'date': "0" + i,
        'month': month - 0 + 1 < 10 ? "0" + (month + 1) : '' + (month + 1),
        "year": year
      })
    }

    var calendar = []
    calendar = calendar.concat(lastMonthDays, currentMonthDays, nextMonthDays)
    var weeks = []

    for (var i = 0; i < calendar.length; i++) {
      if (i % 7 == 0) {
        // 7个一组 分开总数组
        weeks[parseInt(i / 7)] = new Array(7);
      }
      // 用 parseInt来直接实现自动添加分组数据
      weeks[parseInt(i / 7)][i % 7] = calendar[i]
    }

    console.log(weeks)
    this.setData({
      "calendar.year": year,
      "calendar.month": month,
      "calendar.date": date,
      "calendar.weeks": weeks
    })
    util.hideToast()
  }
})