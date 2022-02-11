var that;
Page({

  data: {
    sexArray:['未知','男','女'],
    symptoms:['失能','未失能'],
  },

  onLoad(options) {
    that = this;
    let orders = wx.getStorageSync('pissOrder')||[];
    that.setData({
      orders:orders
    })
  },
  search(e){
    console.log(e);
    let val = e.detail.value;
    let orders = wx.getStorageSync('pissOrder')||[];
    orders = orders.filter(item=>{
      return item.info.name.includes(val);
    })
    that.setData({
      orders:orders
    })
  }
})