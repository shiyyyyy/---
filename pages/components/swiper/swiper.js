
// pages/common/main.js
Component({
  /* 组件的属性列表 */
  properties: {
    res: {
      type: Object,
      value: {}
    }
  },

  /** 组件的初始数据 */
  data: {
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    // 图片地址 前缀
    host: getApp().host
  },

  /* 组件的方法列表 */
  methods: {

  },
  onLoad: function (event) {

  }
})

