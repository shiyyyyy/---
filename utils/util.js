const config = require("./config.js");

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDay(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()  
  const y = month < 10 ? "0" + month : month
  const r = day < 10 ? "0" + day : day
  return year + "-" + y + "-" + r
}
//  请求 函数
function request(parameters = "", success, method = "GET", header = {}) {
  wx.request({
    url: config.BaseURL + (method == "GET" ? "?" : "") + parameters,
    data: {},
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function (res) {
      console.log("网络请求返回值:res");
      console.log(res);
      success(res);
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}
module.exports = {
  formatTime: formatTime,
  getDay: getDay,
  request: request
}
