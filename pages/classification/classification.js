// pages/logs/index.js
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    twoList: [],
    proList: [],
    iconId: '',
    leaderList: [],
    // 设置请求的 条数和开始懂得条数
    limit: 10,
    start: 0,
    // 二级菜单切换 he 当前二级菜单
    currentTwoMenu: 0,
    currentTarget: ''
  },
  // 点击二级菜单
  tapTwoMenu: function (e) {
    // 如果有leaderList(说明是领队页,不需要二级标签)
    if (this.data.leaderList) return

    util.showLoading()
    // 切换当前样式
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTwoMenu: index
    })
    // 重置 start 和 limit 和 清空之前的数组
    this.setData({
      start: 0,
      limit: 10,
      proList: []
    })
    // 如果是全部
    if (index === 0) {
      console.log('全部')
      var id = this.data.iconId
      var start = this.data.start
      var limit = this.data.limit
      var url = `api/B2C/icon_view/${id}/${start}/${limit}`

      this.refreshPage(url)
      return
    }
    // 点击获取点击标签的商品列表
    var target = e.currentTarget.dataset.pdname
    target = encodeURIComponent(target)
    this.setData({
      currentTarget: target
    })
    var id = this.data.iconId
    var start = this.data.start
    var limit = this.data.limit
    var url = `api/B2C/icon_lv2_view/${id}/${target}/${start}/${limit}`
  console.log(url)
    // this.lv2load(url)
  },



  onLoad: function (options) {
    var mod = wx.getStorageSync('mod')
    var id = options.iconid
    this.setData({
      iconId: id,
    })
    var limit = this.data.limit
    var start = this.data.start

    var url = `api/B2C/icon_view/${id}/${start}/${limit}`

    this.refreshPage(url)
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
    console.log('下拉刷新')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉加载')
    this.setData({
      start: this.data.start + 10,
      limit: 10
    })
    // 如果是全部或者刚进入本页面则执行
    if (this.data.currentTwoMenu === 0) {
      var id = this.data.iconId
      var start = this.data.start
      var limit = this.data.limit

      var url = `api/B2C/icon_view/${id}/${start}/${limit}`
      this.refreshPage(url)
    } else {
      var target = this.data.currentTarget
      target = encodeURIComponent(target)
      var id = this.data.iconId
      var start = this.data.start
      var limit = this.data.limit

      var url = `api/B2C/icon_lv2_view/${id}/${target}/${start}/${limit}`
      this.lv2load(url)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 刷新  加载 的时候请求的数据
  refreshPage(url) {
    util.showLoading()
    var url = url
    getApp().post(url, {}, res => {
      var lv2 = []
      if (res.icon_lv2) {
        res.icon_lv2.forEach((item, index) => {
          lv2.push(item)
        })
      }
      lv2.unshift("全部")
      var product_list = res.product_list || ''
      var leader_list = res.leader_list || ''

      if (product_list) {
        product_list = this.data.proList.concat(product_list)
      } else {
        leader_list = this.data.leaderList.concat(leader_list)
      }

      this.setData({
        twoList: lv2,
        proList: product_list,
        leaderList: leader_list
      })
      util.hideToast()
    })
  },
  // 二级小标题 下拉加载
  lv2load(url) {
    getApp().post(url, {}, res => {
      var product_list = res
      product_list = this.data.proList.concat(product_list)
      this.setData({
        proList: product_list
      })
      util.hideToast()
    })
  }
})