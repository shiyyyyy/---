const util = require('../../utils/util.js')

Page({
  data: {
    //下面是字母排序
    letterCountry: [],
    letterCity: [],
    // 默认国家/城市 let
    toViewCountry: '',
    toViewCity: '',
    //  当前 国家/城市
    currentCountry: '',
    currentCity: '',
    // 选择国家/城市的首字母索引 letter
    letCountry: '',
    letCity: '',
    //下面是国家/城市列表信息，这里只是模拟数据
    countrylist: {},
    citylist: '',
  },
  onLoad() {
    var url = 'api/Daolv/get_country_list'
    getApp().post(url, {}, res => {
      console.log(res)

      var letter = []
      for (var i = 0, len = res.length; i < len; i++) {
        letter.push(res[i].first_char)
      }
      this.setData({
        countrylist: res,
        letterCountry: letter
      })
      // 默认以前选中的let 国家
      var letCountry = wx.getStorageSync('letCountry') || ''
      this.setData({
        toViewCountry: letCountry
      })
    })
  },
  //  城市列表  函数区
  //点击国家------------------------------
  cityTap(e) {
    console.log('点击国家')
    console.log(e)
    var that = this;
    const countrycode = e.currentTarget.dataset.countrycode || ''
    const letCountry = e.currentTarget.dataset.let || ''
    // 先把 国家的索引保存
    this.setData({
      letCountry: letCountry
    })
    var url = 'api/Daolv/get_city_list'
    var data = {
      CountryCode: countrycode
    }
    getApp().post(url, data, res => {
      if (res !== '') {
        var letter = []
        for (var i = 0, len = res.length; i < len; i++) {
          letter.push(res[i].first_char)
        }
        this.setData({
          citylist: res,
          letterCity: letter
        })
      }
    })
  },
  // 点击城市 1``-----------------------------
  clickCity(e) {
    console.log('点击城市')
    console.log(e)
    var that = this;
    const countrycode = e.currentTarget.dataset.countrycode || ''
    const letCity = e.currentTarget.dataset.let || ''
    const city = e.currentTarget.dataset.val
    // 先把 国家的索引保存
    this.setData({
      letCity: letCity
    })
    wx.setStorageSync('letCountry', this.data.letCountry)
    wx.setStorageSync('letCity', this.data.letCity)
    wx.setStorageSync('city', city)
    wx.redirectTo({
      url: '../hotelList/hotelList',
    })
  },
  //点击国家索引字母---------------------------
  letterTapCountry(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      toViewCountry: Item
    })
    console.log("..............." + this.data.toViewCountry);
  },
  //点击城市索引字母
  letterTapCity(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      toViewCity: Item
    })
    console.log(this.data.toViewCity);
  },
  //  点击 返回国家
  backCountry() {
    console.log('返回国家')
    this.setData({
      citylist: ''
    })
  },


  onShow() {

  }
})