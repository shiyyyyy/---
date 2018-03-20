
// pages/logs/index.js
Page({

  data: {
    res: {},
    // 搜索历史数组
    historyArr: [],
    // 用户输入的数据
    value: ''
  },

  onLoad: function (options) {
    // 调用缓存,获取联onLoad: function (option) {
    var that = this
    // 查找 搜索记录
    console.log(wx.getStorageSync('searchHistory'))
    if (wx.getStorageSync('searchHistory')) {
      var historyArr = wx.getStorageSync('searchHistory')
    } else {
      var historyArr = []
      wx.setStorageSync('searchHistory', historyArr)
    }
    this.setData({
      historyArr: historyArr
    })
    console.log(this)
  },
  // 输入 触发 input 事件
  bindinput: function (e, value) {
    console.log(e)
    this.setData({
      userInput: e.detail.value
    })
    console.log(this)
  },
  // 点击小键盘上的完成/搜索图标,触发
  doneInput: function (e) {
    var that = this
    console.log(e)
    console.log("点击搜索")
    var userInput = this.data.userInput
    if( userInput === '' ) return 
    var url = 'api/B2C/home'
    getApp().post(url, {}, res => {
      that.setData({
        res: res
      })
    })
    // 添加 搜索记录(还需要判断,因为可能本页面清空,进来刷新没用)
    if (wx.getStorageSync('searchHistory')) {
      var historyArr = wx.getStorageSync('searchHistory')
      for(var i = 0, len = historyArr.length; i < len; i++){
        if( historyArr[i] === userInput) return 
      }
    } else {
      var historyArr = []
      wx.setStorageSync('searchHistory', historyArr)
    }
    historyArr.push(userInput)
    console.log(historyArr)
    this.setData({
      historyArr: historyArr
    })
    wx.setStorageSync('searchHistory', historyArr)
    console.log(wx.getStorageSync('searchHistory'))
    console.log(this)

    // 清空 输入框
    this.setData({
      value: ''
    })
  },

  // 清空 搜索历史
  emptySearchHistory: function () {
    var that = this
    // 显示模态框 确实是否清空 搜索历史
    wx.showModal({
      title: '提示',
      content: '您确定要清空搜索历史吗?',
      // confirmText: '删除',
      // confirmColor: '#db2424',
      success: function (res) {
        if (res.confirm) {         
          try {
            wx.removeStorageSync('searchHistory')
            that.setData({
              historyArr: []
            })
            console.log(that)
          } catch (e) {
            console.log('由于'+ e + '原因出现错误')
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 点击搜索历史
  clickSearchHistory: function(e){
    
  }
})
