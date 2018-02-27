//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    imgUrls: [
      '../../images/banner/banner1.jpg',
      '../../images/banner/banner2.jpg',
      '../../images/banner/banner3.jpg',
      '../../images/banner/banner4.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,
    circular:true,

    // 小分类列表
    tourism_type: { '旅游线路': '../../images/icon/1.jpg', '欧美': '../../images/icon/2.jpg', '东南亚': '../../images/icon/3.jpg', '国内': '../../images/icon/4.jpg', '蜜月游': '../../images/icon/5.jpg', '亲子游': '../../images/icon/6.jpg', '自由行': '../../images/icon/7.jpg', '探险游': '../../images/icon/8.jpg' },

    // 签证服务
    service: [
      { img: "../../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销", countries: "日本", boundaries: "境外游" },
      { img: "../../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销", countries: "日本", boundaries: "境外游" },
      { img: "../../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销", countries: "日本", boundaries: "境外游" },
      { img: "../../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销", countries: "日本", boundaries: "境外游" }],
    response:[]
  },

  // 加载触发 发送请求
  onLoad: function (option) {
    var that = this
    wx.request({
      url: 'http://localhost/test.json',
      data: {},
      method: 'GET',
      success: function (res) {
        // success
        that.setData({
          response: res.data
        })
        console.log(that.data.response)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 点击input 事件 跳转页面
  b_input_tap: function(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 轮播图点击事件
  c_swiper_tag: function (event) {
    console.log(event);
    console.log("点击了轮播图片")
  },
  // 绑定小分类点击事件
  b_type_tap: function() {
    console.log(event);
    console.log("点击了分类小图标")
  },
  // 点击 more 显示全部签证服务
  c_more_tap: function() {
    console.log(event);
    console.log("更多签证服务")
  },
  // 点击 签证服务主体内容 
  b_visa_item_tap: function() {
    console.log(event);
    console.log("进入具体点击页面")
  },
})