// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单列表
    res:[],
    // 用户信息
    userAvatar: '',
    userName: '',
    // 状态 样式 0:all 1:待付款 2:待出发 3:已完成
    currentState: 0   
  },
  //  点击 订单模板(订单信息)
  clickOrdInfo:function(e){
    // 因为 需要把后下的订单在上面显示,所以一已经取反过了,现在把他在反回来
    // 因为下个页面可能还是取反订单,所以不用再反回来了...
    // var index = e.currentTarget.dataset.ind
    // index = res.slice(-index)

    var index = e.currentTarget.dataset.ind
    console.log(index)
    wx.navigateTo({
      url: '../pay/payind=' + index,
    })
  },
  //  点击 查看详情按钮
  checkDetails: function(e){
    //  虽然这里已经给返回的订单取反了,但是在下个页面,订单还是取反的,所以没问题
    var index = e.currentTarget.dataset.ind
    wx.navigateTo({
      url: '../orderDetails/olderDetails?ind=' + index,
    })
  },
  pay: function(e){
    var index = e.currentTarget.dataset.ind

      var that = this
      console.log(e)
      console.log(this)
      getApp().post('api/WxPay/pay', { order_id: that.data.res[index].id }, data => {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl

        that.setData({
          userAvatar: avatarUrl,
          userName: nickName
        })
      }
    })

    getApp().post('api/WxPay/order_list', {}, data=>{
      console.log(data)
      var res = data.reverse()
      this.setData({
        res:res
      })
    })
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