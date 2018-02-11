//index.js
//获取应用实例
const util = require("../../utils/util.js");
const app = getApp()

Page({
  data: {
    // 请求返回值
    response: [],
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,
    circular: true,
    // 时间相关
    select_date: util.getDay(new Date),
    setting_date: util.getDay(new Date),
    // 列表相关
    li: ["南亚风情","众信","北青"],
    // tab列表 && 样式下标
    tab: ["行程详情","资费说明","签证说明"],
    current_tab_index: 0

  },
  // picker 时间选择事件
  datechange: function(e) {
    console.log(e);
    this.setData({
      select_date: e.detail.value
    })
    var date = this.data.select_date
    this.setData({
      setting_date: util.getDay(new Date(new Date(date).getTime() + 86400000) ) 
    })
  },
  filter: function (){
    return "行程亮点"
  },
  // 加载触发 发送请求
  onLoad: function (event) {
    var that = this;
    wx.request({
      url: "http://localhost/danpin.json",
      success: function (res) {
        that.setData({
          response: res.data
        })
      }
    })
  },
  // tab 切换
  c_tab_item_tap: function(e) {
    console.log(e)
    this.setData({
      current_tab_index: e.currentTarget.dataset.idn
    })
  }

})