// pages/logs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    response: {},
    // 控制 hidden 显示隐藏(联系人信息)
    name_hidden: true,
    tel_hidden: true,
    card_hidden: true,
    weixin_hidden: true
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
    console.log("submit表单提交")
    console.log(e)
    // 联系人信息 传递到 pay 页面
    var value = e.detail.value
    try {
      wx.setStorageSync('info', value)
    } catch (e) {
      console.log("缓存出错")
    }
    // 跳转页面 到 pay 
    wx.navigateTo({
      url: "../pay/pay"
    })
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
  //  姓名 input 输入验证 失焦事件
  name_input: function(e) {
    var rex = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/
    var userName = e.detail.value
    // 如果 rex.test(userName) 为真,则输入姓名正确
    console.log("name_input失焦-判断输入是否符合") 
    if ( rex.test(userName) ) {
      this.setData({
        name_hidden: true
      })
    } else {
      this.setData({
        name_hidden: false
      })
    }
    console.log(e)    
    console.log(this.data.name_hidden)
  },
  // 电话 验证 
  tel_input: function(e) {
    var rex = /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/
    var tel = e.detail.value
    console.log("tel_input失焦-判断输入是否符合")
    if (rex.test(tel)) {
      this.setData({
        tel_hidden: true
      })
    } else {
      this.setData({
        tel_hidden: false
      })
    }
    console.log(this.data.tel_hidden)
  },
  // 身份证验证
  card_input: function(e) {
    var rex = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
    var card = e.detail.value
    console.log("card_input失焦-判断输入是否符合")
    if (rex.test(card)) {
      this.setData({
        card_hidden: true
      })
    } else {
      this.setData({
        card_hidden: false
      })
    }
    console.log(this.data.card_hidden)
  },
  // 判断验证是否符合正则,设置hidden显示隐藏

  
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