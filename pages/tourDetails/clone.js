//index.js
//获取应用实例
const util = require("../../utils/util.js");
const app = getApp()

Page({
  data: {

    // 请求返回值
    res: [],
    features: "",
    costCentains: "",
    notCentain: "",
    instructions: "",
    prompt: "",
    booking: "",
    shopping: "",
    instructions: "",
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,
    circular: true,
    // 时间相关
    select_date: util.getDay(new Date),
    setting_date: util.getDay(new Date),
    // tab列表 && 样式下标(标题和内容都要用)
    tab: ["行程详情", "资费说明", "签证说明"],
    current_tab_index: 0,
    // tab切换 内容滑动时间
    duration: 500,
    // 动态改变scroll高度
    boxHeight: 100,
    scrollHeight: 100,
    // 图片/文字的展开 收起
    openImg: "",
    openText: "",
    // 展开隐藏的文本列
    H_features: true,
    H_costCentains: true,
    H_notCentain: true,
    H_instructions: true,
    H_prompt: true,
    H_booking: true,
    H_shopping: true,
    H_instructions: true

  },
  // picker 时间选择事件
  datechange: function (e) {
    console.log(e);
    this.setData({
      select_date: e.detail.value
    })
    var date = this.data.select_date
    this.setData({
      setting_date: util.getDay(new Date(new Date(date).getTime() + 86400000))
    })
  },

  // tab 切换区
  // tab 标题切换
  c_tab_item_tap: function (e) {
    console.log(e)
    this.setData({
      current_tab_index: e.currentTarget.dataset.idn
    })
  },
  // swiper滑动改变事件
  bindchange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      current_tab_index: e.detail.current
    })
  },
  // tab 内容 滚动到底边 事件 
  scrolltolower: function (e) {
    console.log("到底了")
  },


  // 点击图片 放大预览
  b_img_c: function (e) {
    console.log("预览")
    var currentUrl = e.currentTarget.dataset.imgurls
    var currentIndex = e.currentTarget.dataset.imgindex
    wx.previewImage({
      current: currentUrl[currentIndex],
      urls: currentUrl // 需要预览的图片http链接列表
    })
  },
  // 点击 展开全部 文本展开
  c_text_tap: function (e) {
    //  判断点击的 标签的 index 是否相同 => 让每个相同标签显示不同
    console.log(e)
    if (this.data.openText === e.currentTarget.dataset.index) {
      this.setData({
        openText: ""
      })
    } else {
      this.setData({
        openText: e.currentTarget.dataset.index
      })
    }
    console.log((this.data.res['产品详情'].product_modular['产品特色'].split('\n')))
  },

  // 展开隐藏 费用包含
  b_centains_t: function (e) {
    console.log(e)
    var target = e.target.dataset.name
    switch (target) {
      case 'features':
        this.setData({
          H_features: !this.data.H_features
        })
        break
      case 'costCentains':
        this.setData({
          H_costCentains: !this.data.H_costCentains
        })
        break
      case 'notCentain':
        this.setData({
          H_notCentain: !this.data.H_notCentain
        })
        break
      case 'instructions':
        this.setData({
          H_instructions: !this.data.H_instructions
        })
        break
      case 'prompt':
        this.setData({
          H_prompt: !this.data.H_prompt
        })
        break
      case 'booking':
        this.setData({
          H_booking: !this.data.H_booking
        })
        break
      case 'shopping':
        this.setData({
          H_shopping: !this.data.H_shopping
        })
        break
      case 'instructions':
        this.setData({
          H_instructions: !this.data.H_instructions
        })
        break
      default:
    }
    console.log(this)
  },

  // 点击支付 跳转页面
  c_pay_t: function (e) {
    wx.navigateTo({
      url: '../submit/submit',
    })
  },

  // 加载触发 发送请求
  onLoad: function (event) {
    var that = this;

    // 请求轮播图返回对象
    wx.request({
      url: "https://ssl.tlink.cc/cj-back/api/B2C/product/1",
      success: function (resp) {
        that.setData({
          res: resp.data.data,
          features: resp.data.data['产品详情'].product_modular['产品特色'],
          costCentains: resp.data.data['产品详情'].product_modular['费用包含'],
          notCentain: resp.data.data['产品详情'].product_modular['费用不含'],
          instructions: resp.data.data['产品详情'].product_modular['服务说明'],
          prompt: resp.data.data['产品详情'].product_modular['温馨提示'],
          booking: resp.data.data['产品详情'].product_modular['预定须知'],
          shopping: resp.data.data['产品详情'].product_modular['购物场所'],
          instructions: resp.data.data['产品详情'].product_modular['自费项目']
        })
      }
    })

    // 请求路由详情
    wx.request({
      url: "http://localhost/details.json",
      success: function (res) {
        console.log(res.data)
        that.setData({
          details: res.data
        })
      }
    })


    // 系统高度(屏幕)
    var height = 0
    // tab切换 高度
    var boxHeight = 0
    // 滚动条高度
    var scrollHeight = 0

    // 获取 系统信息 (高度)
    wx.getSystemInfo({
      success: function (res) {
        height = res.windowHeight
      }
    });
    // 获取节点信息
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择 节点
    var tab = query.select('.tab').boundingClientRect()
    var footer = query.select('.footer').boundingClientRect()
    query.exec(function (res) {
      //取高度
      console.log(res)
      console.log(res[0].height);
      //  tab 切换 高度
      boxHeight = height - res[1].height - 10
      // 滚动条 scroll 高度
      scrollHeight = boxHeight - res[0].height
      // 设置 高度
      that.setData({
        boxHeight: boxHeight,
        scrollHeight: scrollHeight
      })
    })
  }

})