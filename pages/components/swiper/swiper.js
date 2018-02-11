
// pages/common/main.js
Component({
  /* 组件的属性列表 */
  properties: {
    imgUrlArr: {
      type: Array,
      value: []
    },
    response: {
      type: Object,
      value: {}
    }
  },

  /** 组件的初始数据 */
  data: {
    response: {},
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    // 改变imgUrl 要不然使用不了.路径不对
    imgUrlArr: []
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
  },
  changeImgUrl: function (res) {
    var imgUrlArr = [];
    for (var i = 0, len = res.length; i < len; i++) {
      var imgUrl = "../" + res[i].img; 
      imgUrlArr.push(imgUrl); 
    }
    this.setData({
      imgUrlArr: imgUrlArr
    })
  }
})

