//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      '../../images/0.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,

    // 小分类列表
    tourism_type: { '旅游线路': '../../images/0.jpg', '欧美': '../../images/0.jpg', '东南亚': '../../images/0.jpg', '国内': '../../images/0.jpg', '蜜月游': '../../images/0.jpg', '亲子游': '../../images/0.jpg', '自由行': '../../images/0.jpg', '探险游': '../../images/0.jpg'},

    // 签证服务
    service: [
      { img:"../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销",countries: "日本", boundaries: "境外游" },
      { img:"../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销",countries: "日本", boundaries: "境外游" },
      { img:"../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销",countries: "日本", boundaries: "境外游" },
      { img:"../../images/1.jpg", money: 4999, transport: "北京送签", text: "日本签证,旅游三年,多次往返,我要显示省略号", promotion: "元旦春节促销",countries: "日本", boundaries: "境外游" },]
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})