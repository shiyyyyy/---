//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    // 请求返回值
    response: [],
    visa: {},
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,
    circular: true,
    // 当前 套餐 样式 / 显示隐藏控制
    currentIndex: 0,
    // 人数
    n: 1
  },
  // 加载触发 发送请求
  onLoad: function (event) {
    var that = this;
    wx.request({
      url: "http://localhost/danpin.json",
      success: function (res) {
        that.setData({
          response: res.data
        })
      }
    })
    wx.request({
      url: "http://localhost/visa.json",
      success: function (res) {
        that.setData({
          visa: res.data
        })
      }
    })
  },
  // 点击查看 套餐详情 改变展开图标样式
  c_item_tap: function (e) {
    console.log("点击改变样式和显示/隐藏标签")
    if (this.data.currentIndex === e.currentTarget.dataset.index) {
      this.setData({
        currentIndex: ""
      })
    } else {
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
    }
  },
  // 改变人数 改变总价

})