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
// 转换时间格式(date参数格式: 12312312312312就是都是毫秒数,得先转化为时间)
function getDay(date) {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()  
  const y = month < 10 ? "0" + month : month
  const r = day < 10 ? "0" + day : day
  return year + "-" + y + "-" + r
}

function tomorrow(date){
  return date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
}
// 传过来的date格式 2000-00-00 输出new Date(2000,00,00)
function getDate(date){
  var dateArr = []
  dateArr.push(date.slice(0, 4))
  dateArr.push(date.slice(5, 7))
  dateArr.push(date.slice(8))
  console.log(dateArr)
  return new Date(dateArr[0], dateArr[1], dateArr[2])
}

//网络请求
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

//HUD 
//成功提示
function showSuccess(title = "成功啦", duration = 2500) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: (duration <= 0) ? 2500 : duration
  });
}
//loading提示
function showLoading(title = "请稍后", duration = 5000) {
  wx.showToast({
    title: title,
    icon: 'loading',
    duration: (duration <= 0) ? 5000 : duration
  });
}
//隐藏提示框
function hideToast() {
  wx.hideToast();
}

//显示带取消按钮的消息提示框
function alertViewWithCancel(title = "提示", content = "消息提示", confirm, showCancel = "true") {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
//显示不带取消按钮的消息提示框
function alertView(title = "提示", content = "消息提示", confirm) {
  alertViewWithCancel(title, content, confirm, false);
}
module.exports = {
  formatTime: formatTime,
  getDay: getDay,
  getDate: getDate,
  tomorrow: tomorrow,
  request: request,
  showLoading: showLoading,
  showSuccess: showSuccess,
  hideToast: hideToast 
}
