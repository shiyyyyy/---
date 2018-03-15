// pages/components/mainCellCol/mainCellCol.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
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
    click: function(){
      console.log(this)  
      console.log(this.properties.item.pic)    
    }
  }
})
