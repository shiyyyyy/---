Page({
  data: {
    res: {},
    moneyCalendar: [],
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
    // 用于HTML里点击天时判断当前月,用month的话会改变month
    active: ""
  },
  onLoad: function (options) {
    var that = this

    wx.request({
      url: 'https://ssl.tlink.cc/cj-back/api/B2C/product/1',
      success: function (res) {
        that.setData({
          res: res.data.data['产品团期']
        })

        var moneyCalendar = []
        for (var i = 0, len = that.data.res.length; i < len; i++) {
          var starGroupTime = that.changeFormat(that.data.res[i].dep_date)
          moneyCalendar.push(starGroupTime)
          console.log(moneyCalendar)
          that.setData({
            moneyCalendar: moneyCalendar
          })
        }
      }
    })

    // 页面初始化 options为页面跳转所带来的参数
    var _date = new Date()
    var year = _date.getFullYear()  //年
    var month = _date.getMonth() + 1  //月
    var date = _date.getDate()    //日

    this.setData({
      "calendar.year": year,
      "calendar.month": month,
      "calendar.date": date,
      active: month
    })
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
    console.log(date)
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
    var month = this.data.calendar.month  //月
    var date = this.data.calendar.date   //日

    var target = e.target.dataset.name
    // 判断点击目标 改变月份
    if (target === "prev") {
      month = month - 1
      if (month < 1) {
        month = 12
        year = year - 1
      }
    } else if (target === "next") {
      month = month + 1
      if (month > 12) {
        month = 1
        year = year + 1
      }
    }
    this.setData({
      "calendar.month": month
    })
    this.calendarDrawing(year, month, date)
  },


  // 选择 天  按钮
  selectDay: function (e) {
    console.log(e)
    // 点击的是哪一天
    var targetDay = e.currentTarget.dataset.activeday.date
    // 点击的是哪个月的
    var targetMonth = e.currentTarget.dataset.activeday.month

    // console.log(targetDay)
    this.setData({
      "calendar.date": targetDay,
      active: targetMonth
    })
    console.log(this)
  },


  // 日历 渲染函数
  calendarDrawing: function (year, month, date) {
    var _date = new Date()

    console.log(year + "-" + month + "-" + date)
    var day = _date.getDay() // 周几 返回几就是周几, 0 是周日

    // 这个月的第一天 是周几
    var firstDay = new Date(year, month - 1, 1).getDay()
    console.log('本月第一天是周 :' + firstDay)

    // 上个月在本月显示的天数的数组
    var lastMonthDays = [];
    for (var i = firstDay - 1; i >= 0; i--) {
      // 可以用 负的 天 来从本月算到上个月
      console.log(new Date(year, month - 1, -i).getDate())

      // 上个月的 天 倒序
      lastMonthDays.push({
        // 注意: 数组里面不只有天,还有月份,可以用月分可以判断样式,例如字体颜色
        'date': new Date(year, month - 1, -i).getDate(),
        'month': month - 1
      })
    }
    // 本月 天数 数组
    var currentMonthDays = [];
    console.log(new Date(year, month, 0).getDate()) //判断天数(用下个月的0天 返回本月最后一天)
    for (var i = 1, len = new Date(year, month, 0).getDate(); i <= len; i++) {
      currentMonthDays.push({
        'date': i,
        'month': month
      })
    }
    // 下月 天数 数组
    var nextMonthDays = []
    var endDay = new Date(year, month, 0).getDay(); //判断本月最后一天星期几
    console.log('本月 最后一天 星期几:' + endDay)
    for (var i = 1; i < 7 - endDay; i++) {
      nextMonthDays.push({
        'date': i,
        'month': month + 1
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
  }
})