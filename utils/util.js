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
module.exports = {
  formatTime: formatTime,
  getDay: getDay
}
