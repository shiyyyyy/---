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
    host: getApp().host,
    // 用来判断跳转哪个模板/页面的,但是现在用的是id不对,以后得改
    mod: ''
  },
  onLoad() {
    var mod = wx.getStorageSync('bind_mod')
    this.setData({
      mod: mod
    })
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
      var id = e.currentTarget.dataset.id
      var pdType = e.currentTarget.dataset.pdtype
      this.estimateRoute(pdType, id)
    },

    // 判断跳转页面
    estimateRoute(pdType, pd_id) {
      // 先按照mon来跳转,没有mod的按照原来的id跳转,id跳转是有问题的,以后要改成mod
      if (this.data.mod === '酒店分销') {
        wx.navigateTo({
          url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
        })
      }
      // ['错误','跟团','签证','机票','酒店','门票','当地游']
      switch (pdType) {
        case '1':
          wx.navigateTo({
            url: `../tourDetails/tourDetails?id=${pd_id}&pdType=${pdType}`,
          })
          break;
        case '2':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
          })
          break;
        case '3':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
          })
          break;
        case '4':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
          })
          break;
        case '5':
          wx.navigateTo({
            url: `../ticketsDetails/ticketsDetails?id=${pd_id}&pdType=${pdType}`,
          })
          break;
        case '6':
          wx.navigateTo({
            url: `../tourDetails/tourDetails?id=${pd_id}&pdType=${pdType}`,
          })
          break;
      }
    }
  }
})
