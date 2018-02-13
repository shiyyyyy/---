// pages/logs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    response: {}
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
  },
  // 表单提交事件 
  formSubmit: function(e) {
    console.log(e)
    console.log(this)
  },
  // 签证 单选 改变 事件
  visa_radioChange: function(e) {
    console.log(e)
    console.log(this)
  },
  //  机票 单选 改变
  ticket_radioChange: function(e) {
    console.log(e)
    console.log(this)
  },
  //  姓名 input 输入验证
  input_name: function(e) {
    var rex = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/
    var userName = e.detail.value
    if (rex.test(userName) ) {
      
    }
  },
  // 电话 验证 
  tel_input: function(e) {

  },
  // 身份证验证
  card_input: function(e) {

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