// pages/components/orderInformation/order information.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 图片地址 前缀
    host: getApp().host
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function(e) {
      console.log(this)
      console.log(e)
    }
  }
})
