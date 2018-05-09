// pages/order/order.js
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单列表
    res: [],
    // 控制页数 每次加载多少条 从多少条开始
    pages: 0,
    limit: 10,
    start: 0,
    // 用户信息
    userAvatar: '',
    userName: '',
    // 状态 样式 0:all 1:待付款 2:待出发 3:已完成
    currentState: 0
  },

  //  点击 订单模板(订单信息)
  clickOrdInfo: function (e) {

    // 因为 需要把后下的订单在上面显示,所以已经取反过了(没事,取反并不耽误下标的正确性)
    var index = e.currentTarget.dataset.ind
    var data = this.data.res[index]
    // 如果已经付完款了 就返回查看详情页面,否则,支付页面
    if (data.state === '1') {
      util.showLoading()
      wx.navigateTo({
        url: '../orderDetails/olderDetails?ind=' + index,
      })
      return
    }
    console.log(data)
    console.log(index)
    var pdType = data.paType
    var pd_name = data.pd_name
    var dep_city_name = data.dep_city_name
    var dep_date = data.dep_date
    var back_date = data.back_date
    var amount = data.amount
    var comment = data.comment
    var contact = data.contact
    var order_num = data.order_num
    var mobile = data.mobile
    var orderImgUrl0 = data.pd_pic
    var id = data.id
    // 酒店 才有的
    var orderInfo = JSON.stringify(data.order_info)
    console.log(orderInfo)
    // 判断是由 order 传进去的
    var order = "order"

    wx.navigateTo({
      url: `../pay/pay?pd_name=${pd_name}&dep_city_name=${dep_city_name}&dep_date=${dep_date}&back_date=${back_date}&amount=${amount}&comment=${comment}&contact=${contact}&order_num=${order_num}&mobile=${mobile}&orderImgUrl0=${orderImgUrl0}&id=${id}&order=${order}&orderInfo=${orderInfo}`,
    })
  },
  //  点击 查看详情按钮
  checkDetails: function (e) {
    util.showLoading()
    //  虽然这里已经给返回的订单取反了,但是在下个页面,订单还是取反的,所以没问题
    var index = e.currentTarget.dataset.ind
    wx.navigateTo({
      url: '../orderDetails/olderDetails?ind=' + index,
    })
  },
  pay: function (e) {
    var index = e.currentTarget.dataset.ind
    var that = this
    console.log(e)
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

          // 付款成功之后刷新
          that.refreshPage(that.fn)
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
    console.log("onLoad")
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
    // 现在订单不需要分页
    // var limit = this.data.limit
    // var start = this.data.start

    // var fn = function (res) {
    //   var orderArr = []
    //   for (var i = 0, len = res.length; i, len; i++) {
    //     var order_info = JSON.parse(res[i].order_info)
    //     res[i].order_info = order_info
    //     orderArr.push(res[i])
    //   }
    //   that.setData({
    //     res: orderArr
    //   })
    // }
    // this.refreshPage(limit, start, fn)
    // this.refreshPage(fn)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   *

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this
    console.log("onShow")
    // 现在订单不需要分页
    // var limit = this.data.limit
    // var start = this.data.start


    // this.refreshPage(limit, start, fn)
    this.refreshPage(this.fn)

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
   * 页面相关事件处理函数--监听用户下拉动作  尼玛
   */
  onPullDownRefresh: function () {
    var that = this
    console.log("下拉刷新")
    // this.setData({
    //   start: 0
    // })

    // 现在订单不需要分页
    // var limit = this.data.limit
    // var start = this.data.start
    this.refreshPage(this.fn)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    console.log("上拉加载")
    this.setData({
      start: this.data.start + 1
    })
    // 现在订单不需要分页
    // var limit = this.data.limit
    // var start = this.data.start * 10
    var fn = function (res) {
      that.setData({
        res: res
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 刷新的回调
  fn(res) {
    var that = this
    var orderArr = []
    for (var i = 0, len = res.length; i < len; i++) {
      if (res[i] && res[i].order_info) {
        var order_info = JSON.parse(res[i].order_info)
        res[i].order_info = order_info
      } else {
        res[i].order_info = ''
      }
      orderArr.push(res[i])
    }
    console.log(orderArr)

    that.setData({
      res: orderArr
    })
    // that.setData({
    //   res:res
    // })
    // console.log(that)
  },
  // 刷新函数
  refreshPage: function (fn) {
    util.showLoading()

    getApp().post('api/WxPay/order_list', {
      // 'limit': limit, 'start': start //现在订单不需要这个
    }, data => {

      console.log(data)
      var res = data.reverse()
      fn(res)

      wx.stopPullDownRefresh()
      util.hideToast()
    })
  }
})