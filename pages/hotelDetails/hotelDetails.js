Page({
  data: {
    // 返回的酒店 数据
    hotelData: {},
    // 筛选条件选中与否
    roomScreening: {
      breakfast: false,
      bigBed: false,
      doubleBed: false,
      freeCancellation: false
    },
    // 时间数据
    time: {},
    // 展开隐藏 (按照数字来切换)默认只显示1个
    currentIndex: '',
    // 展开图标 样式
    activeImg: false,
    // 返回顶部 显示/隐藏
    scrollTopShow: true,
    // 距离顶部距离
    scrollTop: 0,

    // 假数据
    hotel: {
      name: '上海徐汇和颐至尊酒店',
      openTime: '2017年开业',
      level: '五星级',
      address: '[光大会展中心]漕宝路124号(近桂林路)[光大会展中心][光大会展中心]'
    },
    roomList: [
      {
        pic: 'https://dimg04.c-ctrip.com/images/200j0f0000007b0zfFDAA_C_190_150_Q50.jpg_.webp?v=1',
        name: '豪华湖景房',
        m2: '64㎡',
        bed: "大/双床",
        floor: "20-25层",
        lowestPrice: 998,
        children: [
          { title: '标准价', breakfast: '双早', bed: '大/双床', numOf: '可住2人', cancel: '不可取消', confirm: '立即确认', price: 1024 },
          { title: '标准价', breakfast: '双早', bed: '大/双床', numOf: '可住2人', cancel: '不可取消', confirm: '立即确认', price: 998 }
        ]
      },
      {
        pic: 'https://dimg04.c-ctrip.com/images/200j0f0000007b0zfFDAA_C_190_150_Q50.jpg_.webp?v=1',
        name: '豪华湖景房',
        m2: '64㎡',
        bed: "大/双床",
        floor: "20-25层",
        lowestPrice: 998,
        children: [
          { title: '标准价', breakfast: '双早', bed: '大/双床', numOf: '可住2人', cancel: '不可取消', confirm: '立即确认', price: 1024 },
          { title: '标准价', breakfast: '双早', bed: '大/双床', numOf: '可住2人', cancel: '不可取消', confirm: '立即确认', price: 998 }
        ]
      },
      {
        pic: 'https://dimg04.c-ctrip.com/images/200j0f0000007b0zfFDAA_C_190_150_Q50.jpg_.webp?v=1',
        name: '豪华湖景房',
        m2: '64㎡',
        bed: "大/双床",
        floor: "20-25层",
        lowestPrice: 998,
        children: [
          { title: '标准价', breakfast: '双早', bed: '大/双床', numOf: '可住2人', cancel: '不可取消', confirm: '立即确认', price: 1024 },
          { title: '标准价', breakfast: '双早', bed: '大/双床', numOf: '可住2人', cancel: '不可取消', confirm: '立即确认', price: 998 }
        ]
      }
    ],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  // onload
  onLoad(options) {
    console.log(options)
    var CheckInDate = options.inDate
    var CheckOutDate = options.outDate
    var night = options.night
    var time = {
      start: CheckInDate,
      end: CheckOutDate,
      night: night
    }
    this.setData({
      time: time
    })
    var HotelIDList = []
    HotelIDList.push(options.hotelId - 0)
    var url = `api/Daolv/get_hotel_room`
    // ? HotelIDList = ${HotelIDList } & CheckInDate=${CheckInDate } & CheckOutDate=${CheckOutDate }
    var data = {
      HotelIDList: HotelIDList,
      CheckInDate: CheckInDate,
      CheckOutDate: CheckOutDate
    }
    getApp().post(url, data, res => {
      console.log(res)
      this.setData({
        hotelData: res[0]
      })
    })
  },
  // 选择 筛选条件
  screening(e) {
    console.log('选择 筛选条件')
    console.log(e)
    var that = this

    var target = e.target.dataset
    console.log(target)
    if (target.breakfast === false || target.breakfast === true) {
      this.setData({
        'roomScreening.breakfast': !this.data.roomScreening.breakfast
      })
    } else if (target.bigBed === false || target.bigBed === true) {
      this.setData({
        'roomScreening.bigBed': !this.data.roomScreening.bigBed
      })
    } else if (target.doubleBed === false || target.doubleBed === true) {
      this.setData({
        'roomScreening.doubleBed': !this.data.roomScreening.doubleBed
      })
    } else if (target.freeCancellation === false || target.freeCancellation === true) {
      this.setData({
        'roomScreening.freeCancellation': !this.data.roomScreening.freeCancellation
      })
    }
    // 发送请求
    // var url = ''
    // var data = {}
    // Object.keys(that.data.roomScreening).forEach((item, index) => {
    //   console.log(item, index)
    //   if (that.data.roomScreening[item] === true) {
    //     data[item] = item
    //   }
    // })
    // console.log(data)
    // getApp().post(url, data, res => {
    //   console.log(res)
    // })
  },
  // 切换 展开/隐藏
  toggle(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    if (this.data.currentIndex === index) {
      this.setData({
        currentIndex: '',
        activeImg: !this.data.activeImg
      })
    } else {
      this.setData({
        currentIndex: index
      })
    }
  },
  // 点击预定
  reservation(e) {
    console.log('点击预定')
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确认预定本房间',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 滚动事件
  scroll(e){
    console.log('滚动')
    console.log(e)
    var scrollTop = e.detail.scrollTop
    if(scrollTop > 500){
      this.setData({
        scrollTopShow: false
      })
    }else{
      this.setData({
        scrollTopShow: true
      })
    }
    
  },
  // 返回顶部
  backTop(){
    console.log('返回顶部')
    this.setData({
      scrollTop: 0,
      scrollTopShow: true
    })
  }
})