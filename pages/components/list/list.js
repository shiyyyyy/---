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
      // 标签
      var label = e.currentTarget.dataset.label
      var id = e.currentTarget.dataset.id
      var pdType = e.currentTarget.dataset.pdtype
      this.estimateRoute(pdType, id, label)
    },

    // 判断跳转页面
    estimateRoute(pdType, pd_id, label) {
      // ['错误','跟团','签证','机票','酒店','门票','当地游']
      switch (pdType) {
        case '1':
          wx.navigateTo({
            url: `../tourDetails/tourDetails?id=${pd_id}&pdType=${pdType}&label=${label}`,
          })
          break;
        case '2':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}&label=${label}`,
          })
          break;
        case '3':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}&label=${label}`,
          })
          break;
        case '4':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}&label=${label}`,
          })
          break;
        case '5':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}&label=${label}`,
          })
          break;
        case '6':
          wx.navigateTo({
            url: `../tourDetails/tourDetails?id=${pd_id}&pdType=${pdType}&label=${label}`,
          })
          break;
      }
    }
  }
})
