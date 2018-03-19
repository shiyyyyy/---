// pages/list/list.js
Component({
  /** 组件的属性列表*/
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
    // 点击二级商品列表
    clickList: function (e) {
      console.log(e)
      console.log(this)
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../tourDetails/tourDetails?id=' + id,
      })
    }
  }
})
