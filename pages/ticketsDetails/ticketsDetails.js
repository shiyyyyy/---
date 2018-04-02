// pages/logs/index.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: {},
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    // 图片path 前面的地址
    host: getApp().host,
    // 判断 展开收起的 各个变量
    material: false,
    booking: false,
    service: false,
    prompt: false,
    // 星期 数组
    day: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayArr: [],
    // 从二级标签列表 传递过来的 小标签
    label: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id
    // 从二级标签列表 传递过来的 小标签
    console.log(options)
    var label = options.label
    if (label !== 'null' && label !== undefined && label !== 'undefined'){
      var label = options.label.split(',')
      this.setData({
        label: label
      })
    }

    wx.setStorageSync("id", options.id)
    var pdType = options.pdType
    this.setData({
      id: id,
      pdType: pdType
    })
    var url = 'api/B2C/product/' + id
    getApp().post(url, {}, res => {
      this.setData({
        res: res
      })
    })
    this.timeTraverse()
  },

  // 点击 展开收起
  fold(e) {
    var target = e.currentTarget.dataset.title
    this.setData({
      [target]: !this.data[target]
    })
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
    // ['错误','跟团','签证','机票','酒店','门票','当地游']
    wx.navigateTo({
      url: `../orderSubmit/orderSubmit?date=${target}&idn=${idn}&pdType=${pdType}`
    })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log("点击分享")
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    return {
      title: '旅游签证',
      path: '/pages/visaDetails/visaDetails?id=' + this.data.id,
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})