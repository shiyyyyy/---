//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    // 请求返回值
    res: [],
    visa: [],
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: true,
    circular: true,
    // 当前 套餐 样式 / 显示隐藏控制
    currentIndex: 0,
    // 人数
    n: 1
  },
  // 加载触发 发送请求
  onLoad: function (event) {
    console.log(event)
    var that = this;
    
  },
  // 点击查看 套餐详情 改变展开图标样式
  c_item_tap: function (e) {
    console.log("点击改变样式和显示/隐藏标签")
    if (this.data.currentIndex === e.currentTarget.dataset.index) {
      this.setData({
        currentIndex: ""
      })
    } else {
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
    }
  },
  // 改变人数 改变总价
  control_n: function (e) {
    console.log(e)
    var target = e.currentTarget.dataset.change
    if (target === "add") {
      this.setData({
        n: this.data.n + 1
      })
    } else {
      if (this.data.n <= 0) {
        this.setData({
          n: 0
        })
      } else {
        this.setData({
          n: this.data.n - 1
        })
      }
    }
  }

})