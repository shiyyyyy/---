// pages/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    back: function (event) {
      console.log("返回按钮")
    },

    search: function (event) {
      console.log("搜索按钮")
    },

    input_change: function (event) {
      console.log("input改变事件");
      console.log(event.detail.value);
    }
  }
})
