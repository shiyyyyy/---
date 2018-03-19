//index.js
//获取应用实例
const util = require("../../utils/util.js")
const app = getApp()

Page({
  data: {
    // 当前页面商品 id
    id: '',
    // 请求返回值
    res: {},
    features: "",
    costCentains: "",
    notCentain: "",
    service: "",
    prompt: "",
    booking: "",
    shopping: "",
    ownExpense: "",
    other: "",
    accom: "",
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,
    circular: true,

    // 图片/文字的展开 收起
    openImg: "",
    openText: "",
    // 展开隐藏的文本列
    H_schedule: false,
    //    上面是 行程详情,底下是需要单独分行的
    H_features: true,
    H_costCentains: true,
    H_notCentain: true,
    H_service: true,
    H_prompt: true,
    H_booking: true,
    //    这里是网站上添加不了的
    H_shopping: true,
    H_ownExpense: true,
    H_other: true,
    H_accom: true,
    //    这里是不需要分行的,不需要单独设置在data里
    H_teamAttribute: true,

    // 星期 数组
    day: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayArr: []

  },
  // 时间格式
  timeTraverse: function () {
    var dayArr = []
    var y = new Date().getFullYear()
    var m = new Date().getMonth()
    var d = new Date().getDate()
    for (var i = 0; i < 7; i++) {
      var newTime = new Date(y, m, d + i)
      var year = newTime.getFullYear()
      var month = newTime.getMonth() + 1 < 10 ? '0' + (newTime.getMonth() + 1) : "" + newTime.getMonth() + 1
      var date = newTime.getDate() < 10 ? '0' + newTime.getDate() : "" + newTime.getDate()
      var day = newTime.getDay()
      dayArr.push({
        year: year,
        month: month,
        date: date,
        day: this.data.day[day]
      })
    }
    this.setData({
      dayArr: dayArr
    })
    console.log(this)
  },
  // 点击 进店咨询
  enterStore: function (e) {
    var productImgUrl0 = this.data.res.pd_detail['产品图片'][0].path
    var productTitle = this.data.res.pd_detail['产品名称']
    wx.navigateTo({
      url: `../store/store?productImgUrl0=${productImgUrl0}&productTitle=${productTitle}`,
    })
  },

  // 选择日期 / 点击立即预定
  selectDate: function (e) {
    console.log(e)
    util.showLoading()
    var target = e.currentTarget.dataset.date || ""
    var dateArr = this.data.res.groups
    var idn = ''
    for(var i = 0, len = dateArr.length; i < len; i++){
      if(dateArr[i].dep_date === target){
        idn = i
      }
    }
    wx.navigateTo({
      url: `../orderSubmit/orderSubmit?date=${target}&idn=${idn}`
    })
  },

  // 点击 展开全部 文本展开
  c_text_tap: function (e) {
    //  判断点击的 标签的 index 是否相同 => 让每个相同标签显示不同
    console.log(e)
    if (this.data.openText === e.currentTarget.dataset.index) {
      this.setData({
        openText: ""
      })
    } else {
      this.setData({
        openText: e.currentTarget.dataset.index
      })
    }
  },

  // 展开隐藏 费用包含
  b_centains_t: function (e) {
    console.log(e)
    var target = e.target.dataset.name
    switch (target) {
      case 'features':
        this.setData({
          H_features: !this.data.H_features
        })
        break
      case 'costCentains':
        this.setData({
          H_costCentains: !this.data.H_costCentains
        })
        break
      case 'notCentain':
        this.setData({
          H_notCentain: !this.data.H_notCentain
        })
        break
      case 'service':
        this.setData({
          H_service: !this.data.H_service
        })
        break
      case 'prompt':
        this.setData({
          H_prompt: !this.data.H_prompt
        })
        break
      case 'booking':
        this.setData({
          H_booking: !this.data.H_booking
        })
        break
      case 'shopping':
        this.setData({
          H_shopping: !this.data.H_shopping
        })
        break
      case 'ownExpense':
        this.setData({
          H_ownExpense: !this.data.H_ownExpense
        })
        break
      case 'schedule':
        this.setData({
          H_schedule: !this.data.H_schedule
        })
        break
      case 'other':
        this.setData({
          H_other: !this.data.H_other
        })
        break
      case 'accom':
        this.setData({
          H_accom: !this.data.H_accom
        })
        break
      // 不需要放在 data 里面的
      case 'teamAttribute':
        this.setData({
          H_teamAttribute: !this.data.H_teamAttribute
        })
        break
      default:
    }
    console.log(this)
  },

  // 转发商品页面 点击分享
  onShareAppMessage: function (res) {
    var that = this
    console.log("分享按钮")
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("button")
    }
    return {
      title: '开来旅行吧',
      path: '/pages/tourDetails/tourDetails?id=' + that.data.id,
      success: function (res) {
        // 转发成功
        console.log("转发成功")
        console.log('/pages/tourDetails/tourDetails?id=' + that.data.id)
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },
  // 加载触发 发送请求
  onLoad: function (options) {
    util.showLoading()    
    var that = this;

    wx.setStorageSync("id", options.id)
    this.setData({
      id: options.id
    })
    this.timeTraverse()
    // 请求轮播图返回对象
    var url = 'api/B2C/product/' + options.id
    console.log(url)
    app.post(url, {}, res => {
      this.setData({
        res: res,
        features: res.pd_detail['产品特色'],
        costCentains: res.pd_detail['费用包含'],
        notCentain: res.pd_detail['费用不含'],
        service: res.pd_detail['服务说明'],
        prompt: res.pd_detail['温馨提示'],
        booking: res.pd_detail['预定须知'],

        shopping: res.pd_detail['购物说明'] || '',
        ownExpense: res.pd_detail['自费说明'] || '',
        other: res.pd_detail['其他说明'] || '',
        accom: res.pd_detail['住宿说明'] || ''
      })
      util.hideToast()
    })
    console.log("tourDetails:this")
    console.log(this)

    wx.showShareMenu({
      withShareTicket: true
    })
  }, onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // onLounch
  onLaunch: function (ops) {
    if (ops.scene == 1044) {
      console.log("onLaunch")      
      console.log(ops.shareTicket)
    }
  }

})