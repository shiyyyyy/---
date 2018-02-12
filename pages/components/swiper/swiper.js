
// pages/common/main.js
Component({
  /* 组件的属性列表 */
  properties: {
    response: {
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
  },

  /* 组件的方法列表 */
  methods: {
    c_main_item_tap: function (event) {
      console.log(this);
      console.log("点击main-item")
    },
    click: function (e){
      console.log(this)
    }
  },
  onLoad: function (event) {
   console.log("我是swiper组件的onLoad")
  }
})

