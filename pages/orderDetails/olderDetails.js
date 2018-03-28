const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    res: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.ind
    getApp().post('api/WxPay/order_list', {}, data => {
      console.log(data)
      console.log(options)
      var res = data.reverse()
      this.setData({
        res: res[index]
      })
      util.hideToast()
    })
    console.log(this)
  },
  // 点击 地址
  clickAddress: function () {
    var latitude = 39.94825 // 纬度
    var longitude = 116.4503  // 经度
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,
      name: "南亚风情",
      address: "北京市朝阳区新源里16号琨莎中心A座3楼(近昆仑饭店)",
    })
  },
  // 点击 电话
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-058-2007',
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
