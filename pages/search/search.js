
// pages/logs/index.js
Page({

  data: {
    res:{},
    // 用户输入的数据
    userInput: ''
  },
 
  onLoad: function (options) {
    // 调用缓存,获取联onLoad: function (option) {
    var that = this
    wx.request({
      url: 'http://localhost/test.json',
      success: function (res) {
        console.log(res)
        that.setData({
          res: res.data
        })
      }
    })
    console.log(this)
  },
  // 输入 触发 input 事件
  b_input_tap: function(e){
    console.log(e)
    this.setData({
      userInput: e.detail.value
    })
  },
  // 点击小键盘上的完成,触发
  doneInput: function(e){
    console.log(e) 

  },
  // 搜索 (点击搜索图标)
  search: function(e){
    wx.request({
      url: '',
    })
  }
})
