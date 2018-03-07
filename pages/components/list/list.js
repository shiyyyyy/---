// pages/list/list.js
Component({
  /** 组件的属性列表*/
  properties: {
    data:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    b_list_item_tap: function(event) {
      console.log("list-item")
      wx.navigateTo({
        url: '../tourDetails/tourDetails',
      })
    }
  }
})
