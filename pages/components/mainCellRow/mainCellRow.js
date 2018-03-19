// pages/components/mainCellRow/mainCellRow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    res: {
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
    clickProduct: function(e){
      console.log(e)
      console.log(this)
    }
  }
})
