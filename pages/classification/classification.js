// pages/logs/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    response:{},
    // 旅游线路分类
    partition: ["国内","北美","澳洲","北极"],
    // 旅行路线&&全球签证当前样式判断
    active: false,
    currentStyle: 1,
    // key 为判断 左边nav样式,i为判断右边区块样式
    key: 1,
    i: null
  },
  c_route_tap: function() {
    console.log(this)
    this.setData({
      currentStyle: 1
    })
  },
  c_visa_tap: function() {
    console.log(this.currentStyle)
    this.setData({
      currentStyle: 2
    })    
  },
  // 点击左边导航栏触发
  c_navBar_tap: function(e) {
    console.log(this)
    this.setData({
      i: null,
      key: e.currentTarget.dataset.key
    })
  },
  // 点击右边区块内容 触发
  c_class_item_tap: function(e) {
    console.log(e)
    this.setData({
      i: e.currentTarget.dataset.i
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost/partition.json',
      data: {},
      method: 'GET',
      success: function (res) {
        // success
        that.setData({
          response: res.data.partition,
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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