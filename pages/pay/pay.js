// pages/logs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    response: {},
    // 联系人 信息
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://localhost/test.json',
      success: function (res) {
        console.log(res)
        that.setData({
          response: res.data[0]
        })
      }
    })
    console.log(this)
    // 调用缓存,获取联系人信息
    try {
      var value = wx.getStorageSync('info')
      if (value) {
        this.setData({
          info: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  // 点击 支付 按钮
  pay: function(e) {
    console.log(e)
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
  onShareAppMessage: function () {

  }
})