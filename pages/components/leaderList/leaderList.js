// pages/components/leaderList/leaderList.js
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
    host: getApp().host
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickList(e) {
      console.log(e)
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `../leaderWebView/leaderWebView?id=${id}`
      })
    }
  }
})
