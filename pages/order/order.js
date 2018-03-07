// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求数据
    response: [],
    data: {},
    travel:[],
    copyTravel: [],
    visa: [],
    copyVisa:[],
    // 旅行订单 签证订单显示隐藏
    orderHidden: true,

    // 订单 样式
    currentOrder: true,
    // 状态 样式
    currentState: 0
  },

  // 点击 旅行订单
  c_travel_tap: function(e) {
    this.setData({
      currentOrder: true,
      orderHidden: true,
      currentState: 0,
      travel: this.data.copyTravel
    })
  },
  // 点击签证订单
  c_visa_tap:function(e) {
    this.setData({
      currentOrder: false,
      orderHidden: false,
      currentState: 0,
      visa: this.data.copyVisa     
    })

  },
  //  点击 状态
  c_state_tap:function(e) {
    console.log(e)
    // 状态 样式改变
    var id = e.target.dataset.id
    var name = this.data.orderHidden
    console.log(name)
    this.setData({
      currentState: id
    })
    // 改变状态 改变数据
    switch(id){
      case "0":
      if( name ) {
        this.setData({
          travel: this.data.copyTravel
        })
      } else {
        this.setData({
          visa: this.data.copyVisa
        })
      } 
        break;
      case "1":
        this.changeList(id, name)
        break;
      case "2":
        this.changeList(id, name)
        break;
      case "3":
        this.changeList(id, name)
        break;
      default:
        console.log("switch报错 order.JS")
    }
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

    wx.request({
      url: 'http://localhost/infoList.json',
      success: function (res) {
        console.log(res)
        that.setData({
          travel: res.data.travel,
          copyTravel: res.data.travel,
          visa: res.data.visa,
          copyVisa: res.data.visa,
        })
      }
    })
    console.log(this)
  },
  // 改变状态数组
  changeList: function (state, name){    
    var arr = name ? this.data.copyTravel.concat() : this.data.copyVisa.concat()
    var newArr = []
    for(var i = 0, len = arr.length; i < len; i++){
      if (arr[i] == state ){
        newArr.push(arr[i])
      }
    }
    if( name ) {
      this.setData({
        travel: newArr
      })
    } else {
      this.setData({
        visa: newArr
      })
    }
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