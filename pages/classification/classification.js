// pages/logs/index.js
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    twoList: [],
    proList: {},
    iconId: '',
    // 二级菜单切换
    currentTwoMenu: 0
  },
  // 点击二级菜单
  tapTwoMenu: function (e) {
    util.showLoading()
    // 切换当前样式
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTwoMenu: index
    })
    if (index === 0) {
      console.log('全部')
      var url = 'api/B2C/icon_view/' + this.data.iconId
      console.log(url)
      getApp().post(url, {}, res => {
        var lv2 = []
        res.icon_lv2.forEach((item, index) => {
          lv2.push(item)
        })
        lv2.unshift("全部")
        this.setData({
          twoList: lv2,
          proList: res.product_list
        })
        util.hideToast()
      })
      return
    }
    // 点击获取点击标签的商品列表
    var target = e.currentTarget.dataset.pdname
    console.log(target)
    console.log(e)
    var url = `api/B2C/icon_lv2_view/${this.data.iconId}/${target}`
    getApp().post(url, {}, res => {
      this.setData({
        proList: res
      })
    })

    util.hideToast()
  },



  onLoad: function (options) {
    util.showLoading()
    var url = 'api/B2C/icon_view/' + options.iconid
    getApp().post(url, {}, res => {
      var lv2 = []
      res.icon_lv2.forEach((item, index) => {
        lv2.push(item)
      })
      lv2.unshift("全部")
      this.setData({
        twoList: lv2,
        proList: res.product_list,
        iconId: options.iconid
      })
    })
    console.log(this)
    util.hideToast()
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