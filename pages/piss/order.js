var that;
Page({

  data: {
    sexArray:['未知','男','女'],
    symptoms:['严重压疮','严重痔疮','严重疝气','肛瘘','严重便秘'],
  },

  onLoad(options) {
    that = this;
    let orders = wx.getStorageSync('orders');
    that.setData({
      orders:orders
    })
  },
  search(e){
    console.log(e);
    let val = e.detail.value;
    let orders = wx.getStorageSync('orders')||[];
    orders = orders.filter(item=>{
      return item.info.name.includes(val);
    })
    that.setData({
      orders:orders
    })
  }
})