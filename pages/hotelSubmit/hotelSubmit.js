const util = require("../../utils/util.js")
const app = getApp()
Page({
  data: {
    // 上个页面传过来的酒店信息
    roomData: {},
    // 人数
    num: 1
  },

  // 电话 验证 
  tel_input: function (e) {
    var rex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
    var tel = e.detail.value
    console.log("tel_input失焦-判断输入是否符合")
    if (rex.test(tel)) {
      this.setData({
        tel_hidden: true
      })
    } else {
      this.setData({
        tel_hidden: false
      })
    }
    console.log(this.data.tel_hidden)
  },

  onLoad: function (options) {
    var roomData = options.roomData
    roomData = JSON.parse(roomData)
    this.setData({
      roomData: roomData
    })
    console.log(roomData)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  // 改变 人数 
  ctorNum: function (e) {
    console.log(e)
    var target = e.target.dataset.name

    switch (target) {
      case 'subNum':
        if (this.data.num > 1) {
          console.log("num - 1")
          this.setData({
            num: this.data.num - 1
          })
        }
        break;
      case 'addNum':
        console.log("num + 1")
        if (this.data.num >= this.data.roomData.StandardOccupancy) return
        this.setData({
          num: this.data.num + 1
        })
        break;
      default:
        console.log("都不对,默认default")
    }
  },

  // 提交订单(表单)事件
  formSubmit: function (e) {
    var value = e.detail.value
    console.log(value.otherNeed)
    var reg = /^(\+?0?86\-?)?1[345789]\d{9}$/

    // 如果没填写联系人信息,不行
    if (value.last_name === '' || value.first_name === '' || value.last_name === undefined || value.first_name === undefined) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if (!reg.test(value.mobile)) {
      // 弹出框 提示用户输入 姓名/电话
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none'
      })
      return
    }
    if (value.email === '' || value.email === undefined) {
      // 弹出框 提示用户输入 姓名/电话
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none'
      })
      return
    }
    console.log(value)
    // var tel = []
    // var name = []
    // for (var j = 0; j < this.data.num; j++) {
    //   var telNum = 'tel' + j
    //   var nameNum = 'name' + j
    //   console.log(telNum)
    //   if (value[telNum]) {
    //     tel.push(value[telNum])
    //   }
    //   name.push(value[nameNum])
    // }
    // // 联系人信息 传递到 pay 页
    var daolv_id = this.data.roomData.hotelId
    var room_id = this.data.roomData.RatePlanID
    var num_of_people = this.data.num
    var pd_name = this.data.roomData.RatePlanName
    var in_date = this.data.roomData.start
    var out_date = this.data.roomData.end
    var night = this.data.roomData.night
    var amount = this.data.roomData.TotalPrice // 总价 total
    var comment = value.otherNeed || ''
    var last_name = value.last_name || ''
    var first_name = value.first_name || ''
    var mobile = value.mobile || ''
    var email = value.email || ''
    console.log(daolv_id, room_id, num_of_people, pd_name, in_date, out_date, night, amount, comment, last_name, first_name, mobile)

    getApp().post('api/WxPay/order', {
      'daolv_id': daolv_id, // 酒店id
      'room_id': room_id,  // 房间的id
      'num_of_people': num_of_people, // 人数
      'comment': comment, // 其他需求
      // 'contact': contact, // 联系人姓名
      'last_name': last_name, // 姓
      'first_name': first_name, //名
      'mobile': mobile, // 电话
      'pd_name': pd_name,
      'in_date': in_date,
      'out_date': out_date,
      'night': night,
      'amount': amount,
      'email': email
    }, data => {
      // ['id','order_num','retail_price','amount']
      // 团id    订单人数    担任金额    总金额
      console.log(data)
      var pd_name = data.pd_name
      var in_date = data.in_date
      var out_date = data.out_date
      var amount = data.amount
      var comment = data.comment
      var contact = data.last_name + data.first_name
      var order_num = data.order_num
      var mobile = data.mobile
      var night = data.night
      var id = data.id
      wx.navigateTo({
        url: `../pay/pay?pd_name=${pd_name}&in_date=${in_date}&out_date=${out_date}&amount=${amount}&comment=${comment}&contact=${contact}&order_num=${order_num}&night=${night}&mobile=${mobile}&id=${id}`
      })
    })
  }

})