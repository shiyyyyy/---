// pages/logs/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    res: {},
    // 二级菜单切换
    currentTwoMenu: 0
  },
  // 点击二级菜单
  tapTwoMenu: function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTwoMenu: index
    })
  },

  onLoad: function (option) {
    var that = this
    wx.request({
      url: 'http://localhost/二级标题.json',
      success: function (res) {
        that.setData({
          res: res.data
        })
      }
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