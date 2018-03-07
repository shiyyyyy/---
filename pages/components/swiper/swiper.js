
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
    imgUrls: [
      '../../../images/banner/banner1.jpg',
      '../../../images/banner/banner2.jpg',
      '../../../images/banner/banner3.jpg',
      '../../../images/banner/banner4.jpg'
    ],
  },

  /* 组件的方法列表 */
  methods: {
    c_main_item_tap: function (event) {

    },
    click: function (e){
      console.log(this.data.res['产品详情'].product_modular['产品图片'])
      console.log(this)
    }
  },
  onLoad: function (event) {
   wx.request({
     url: '',
   })
  }
})

