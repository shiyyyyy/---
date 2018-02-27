
// pages/logs/index.js
Page({

  data: {
    data:{}
  },
 
  onLoad: function (options) {
    // 调用缓存,获取联onLoad: function (option) {
    var that = this
    wx.request({
      url: 'https://way.jd.com/jisuapi/get?channel=头条&num=10&start=0&appkey=52a4f6a9bd2387ce35a71cade52baf2a',
      success: function (res) {
        console.log(res)
        that.setData({
          data: res.data
        })
      }
    })
    console.log(this)
  },

  // 点击  
  click: function (e) {
    wx.switchTab({
      url: '../index/index',
    })
  }
})
