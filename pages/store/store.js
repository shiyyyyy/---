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
    var that = this

    wx.request({
      url: 'https://ssl.tlink.cc/cj-back/api/B2C/product/1',
      success: function(res){
        that.setData({
          res: res.data.data
        })
      }
    })
  },
  // 点击 地址
  clickAddress: function(){
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
      phoneNumber: '84683388',
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