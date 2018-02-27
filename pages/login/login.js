const util = require("../../utils/util.js");
var OPEN_ID = ''
var SESSION_KEY = ''
Page({
  data: {

  },
  onLoad: function (e) {
    wx.checkSession({
      success: function () {
        console.log("登录未过期")
      },
      fail: function () {
        //登录态过期
        console.log("登录过期")
        wx.login() //重新登录

      }
    })
  },
  click: function () {
    wx.login({
      success: function (res) {
        console.log(111)
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: "wx8ce0cd4e02f43262",
              secret: "c3c2f49d475960fef620ceccaa6d078f",
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: function (res) {
              console.log(res.data)
              OPEN_ID = res.data.openid;//获取到的openid  
              SESSION_KEY = res.data.session_key;//获取到session_key  
              console.log(OPEN_ID)
              console.log(SESSION_KEY)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }

})