// pages/logs/index.js
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: {},
    // 上个页面 depart 传过来的数据(放在缓存里)
    idn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showLoading()
    console.log(options)
    var res = {
      pd_name: options.pd_name,
      dep_city_name: options.dep_city_name,
      dep_date: options.dep_date,
      back_date: options.back_date,
      amount: options.amount,
      comment: options.comment,
      contact: options.contact,
      order_num: options.order_num,
      mobile: options.mobile,
      orderImgUrl0: options.orderImgUrl0,
      id: options.id,
      order: options.order
    }
    this.setData({
      res: res
    })
    util.hideToast()
    console.log(this)
  },
  // 点击 到店支付
  arriveStore: function(e){
    console.log(this)
    var productImgUrl0 = this.data.res.orderImgUrl0
    var productTitle = this.data.res.pd_name
    var orderNum = this.data.res.order_num
    wx.navigateTo({
      url: `../store/store?productImgUrl0=${productImgUrl0}&productTitle=${productTitle}&orderNum=${orderNum}`,
    })
  },
  // 点击 支付 按钮
  pay: function (e) {
    console.log(e)
    console.log(this)
    getApp().post('api/WxPay/pay', { order_id: this.data.res.id }, data => {
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': 'MD5',
        'paySign': data.paySign,
        'success': function (res) {
          wx.showToast({
            title: '支付成功',
          })
          // 跳转到 订单
          wx.switchTab({
            url: '../order/order'
          })
        },
        'fail': function (res) {
          wx.showModal({
            title: '支付失败'
          })
        }
      })
    })
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
    util.showLoading()
    console.log("onUnload")
    if(this.data.res.order === "order"){
      util.hideToast()
      return 
    }
    wx.navigateBack({
      delta: 1
    })
    util.hideToast()
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
  onShareAppMessage: function () {

  }
})