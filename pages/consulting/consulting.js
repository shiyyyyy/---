// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ["../../images/2.jpg", "../../images/2.jpg", "../../images/2.jpg", "../../images/2.jpg", "../../images/2.jpg"]
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

  },

  // 预览图片
  // previewImg(e){
  //   var urls = this.data.imgUrls
  //   var currentUrl = e.currentTarget.dataset.url
  //   wx.previewImage({
  //     current: currentUrl, // 当前显示图片的http链接
  //     urls: urls // 需要预览的图片http链接列表
  //   })
  // },

  // 店家电话咨询按钮
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-058-2007',
    })
  },

  // 点击地址
  clickAddress: function () {
    // var latitude = 39.94825 // 纬度
    // var longitude = 116.4503  // 经度
    var latitude = 39.924354 // 纬度
    var longitude = 116.459698  // 经度
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,
      name: "笨象旅途",
      address: "北京市朝阳区新源里16号琨莎中心A座3楼(近昆仑饭店)",
    })

  }
})