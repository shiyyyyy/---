// pages/logs/index.js
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: {},
    // 上个页面 depart 传过来的数据(放在缓存里)
    order_res: '',
    idn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync("id")    
    var url = 'api/B2C/product/' + id
    getApp().post(url, {}, res => {
      this.setData({
        res: res
      })
    })

    // 调用缓存,获取联系人信息
    try {
      var idn = wx.getStorageSync("idn")
      console.log(idn)
      var order_res = wx.getStorageSync('order_res')

      this.setData({
        idn: idn,
        order_res: order_res
      })
    } catch (e) {
      // Do something when catch error
    }
    util.hideToast()
    console.log(this)
    console.log(order_res)
  },
  // 点击 支付 按钮
  pay: function (e) {
    console.log(e)
    console.log(this)
    console.log(this.data.order_res.id)
    getApp().post('api/WxPay/pay', { order_id: this.data.order_res.id }, data => {
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