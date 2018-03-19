//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.sid = wx.getStorageSync('sid')

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.post(
          'api/WxPay/login',
          { code: res.code },
          data => {
            wx.setStorageSync('sid', data.sid)
            this.sid = data.sid
          }
        )
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // host: 'http://localhost:8080/cj-back/',
  host: 'https://nyfq.tlink.cc/cj-back/',
  post: (url, data, cb) => {
    data = data || {}
    var app = getApp();
    data.sid = app.sid;
    url = app.host + url;
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: res => {
        var data = res.data;
        if (!data.success) {
          wx.showModal({
            title: '出错了',
            content: data.message,
          })
        } else {
          cb(data.data)
        }
      },
      fail: res => {
        wx.showModal({
          title: '请求失败',
          content: JSON.stringify(res),
        })
      },
    })
  }

})