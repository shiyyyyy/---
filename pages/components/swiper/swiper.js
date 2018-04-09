
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
    previewImg(e){
      console.log(e)
      console.log(this)
      var index = e.currentTarget.dataset.index
      var urls = []
      var host = this.data.host
      var imgArr = this.data.res.pd_detail['产品图片']
      for(var i = 0, len = imgArr.length; i < len; i++){
        var path = host + imgArr[i].path
        urls.push(path)
      }
      console.log(urls)
      wx.previewImage({
        current: urls[index], // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    }
  },
  onLoad: function (event) {
    console.log("swiper组件")
    console.log(this)
  }
})

