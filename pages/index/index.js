//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js")

Page({
  data: {
    res: {},
    // 图片地址 前缀
    host: getApp().host,
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,
    circular:true
  },

  // 加载触发 发送请求
  onLoad: function (option) {
    this.loadRefreshFn()
    console.log("index:this")
    console.log(this)
  },
  // 点击input 事件 跳转页面
  b_input_tap: function(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 轮播图点击事件
  c_swiper_tag: function (event) {
    console.log(event);
    console.log("点击了轮播图片")
  },
  // 绑定小分类点击事件
  tapType: function(e) {
    console.log(e);
    var target = e.target.dataset.iconid
    console.log("点击了分类小图标id:" + target)
    wx.navigateTo({
      url: '../classification/classification?iconid=' + target,
    })
  },
  // 点击 more 显示全部签证服务
  c_more_tap: function() {
    console.log(event);
    console.log("更多签证服务")
  },
  // 点击 签证服务主体内容 
  b_visa_item_tap: function() {
    console.log(event);
    console.log("进入具体点击页面")
  },
  // 点击底下的 footer 跳转到咨询页面
  jumpConsult: function(){
    wx.switchTab({
      url: '../consulting/consulting'
    })
  },

  // 下拉刷新事件
  onPullDownRefresh: function(){
    this.loadRefreshFn(wx.stopPullDownRefresh())
  },
  // 加载 或者刷新页面调用的函数
  loadRefreshFn: function(fn){
    util.showLoading()
    var url = 'api/B2C/home'
    app.post(url, {}, res => {
      this.setData({
        res: res
      })
    })
    util.hideToast()
    if(fn) fn()
  }
})