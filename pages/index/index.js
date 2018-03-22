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
    circular: true
  },

  // 加载触发 发送请求
  onLoad: function (options) {
    this.loadRefreshFn()
    console.log("index:this")
    console.log(this)
  },
  // 点击input 事件 跳转页面
  b_input_tap: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 轮播图点击事件
  c_swiper_tag: function (e) {
    console.log(e);
    console.log("点击了轮播图片")
    var pdType = e.currentTarget.dataset.pdtype
    var pd_id = e.currentTarget.dataset.pd_id
    this.estimateRoute(pdType, pd_id)
  },
  // 绑定小分类点击事件
  tapType: function (e) {
    console.log(e);
    var target = e.target.dataset.iconid
    console.log("点击了分类小图标id:" + target)
    wx.navigateTo({
      url: '../classification/classification?iconid=' + target,
    })
  },

  // 点击首页列表
  clickIndexList(e) {
    var pd_id = e.currentTarget.dataset.pd_id
    var pdType = e.currentTarget.dataset.pdtype
    console.log("商品类型:" + pdType)

    this.estimateRoute(pdType, pd_id)
  },

  // 点击底下的 footer 跳转到咨询页面
  jumpConsult: function () {
    wx.switchTab({
      url: '../consulting/consulting'
    })
  },

  // 下拉刷新事件
  onPullDownRefresh: function () {
    this.loadRefreshFn(wx.stopPullDownRefresh())
  },
  // 加载 或者刷新页面调用的函数
  loadRefreshFn: function (fn) {
    util.showLoading()
    var url = 'api/B2C/home'
    app.post(url, {}, res => {
      this.setData({
        res: res
      })
    })
    util.hideToast()
    if (fn) fn()
  },

  // 判断跳转页面
  estimateRoute(pdType, pd_id) {
    // ['错误','跟团','签证','机票','酒店','门票','当地游']
    switch (pdType) {
      case '1':
        wx.navigateTo({
          url: `../tourDetails/tourDetails?id=${pd_id}&pdType=${pdType}`,
        })
        break;
      case '2':
        wx.navigateTo({
          url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
        })
        break;
      case '3':
        wx.navigateTo({
          url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
        })
        break;
      case '4':
        wx.navigateTo({
          url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
        })
        break;
      case '5':
        wx.navigateTo({
          url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
        })
        break;
      case '6':
        wx.navigateTo({
          url: `../tourDetails/tourDetails?id=${pd_id}&pdType=${pdType}`,
        })
        break;
    }
  }
})