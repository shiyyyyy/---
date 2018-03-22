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
    // 展开折叠 控制
    // 团队属性 行程详情 产品特色 费用包含
    teamAttribute: false,
    schedule: true,
    features: false,
    costCentains: false,
    // 费用不含 服务说明 温馨提示 预定须知
    notCentain: false,
    service: false,
    prompt: false,
    booking: false,
    // 住宿说明 其他说明
    accom: false,
    other: false,
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
    for (var i = 0, len = dateArr.length; i < len; i++) {
      if (dateArr[i].dep_date === target) {
        idn = i
      }
    }
    var pdType = this.data.pdType
    wx.navigateTo({
      url: `../orderSubmit/orderSubmit?date=${target}&idn=${idn}&pdType=${pdType}`
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
    var target = e.currentTarget.dataset.title
    this.setData({
      [target]: !this.data[target]
    })
    console.log(this.data)
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
      title: '快来旅行吧',
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
    console.log(options)
    wx.setStorageSync("id", options.id)
    this.setData({
      id: options.id,
      pdType: options.pdType
    })
    this.timeTraverse()
    // 请求轮播图返回对象
    var url = 'api/B2C/product/' + options.id
    console.log(url)
    app.post(url, {}, res => {
      this.setData({
        res: res
      })
      util.hideToast()
    })
    console.log("tourDetails:this")
    console.log(this)

    wx.showShareMenu({
      withShareTicket: true
    })
  }, 
  onShow(e) {
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