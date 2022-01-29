var that;
Page({

  data: {
    orders:[],
    sexArray:['未知','男','女']
  },
  onLoad: function (options) {
    that = this;
    let orders = wx.getStorageSync('nutritionOrders') ||[];
    that.setData({
      orders:orders
    })
  },
  search(e){
    console.log(e);
    let val = e.detail.value;
    let orders = wx.getStorageSync('nutritionOrders') ||[];
    orders = orders.filter(item=>{
      return item.info.age.includes(val);
    })
    that.setData({
      orders:orders
    })
  }
})