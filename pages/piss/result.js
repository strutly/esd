var that;
Page({

  data: {

  },

  onLoad(options) {
    that = this;
    let orders = wx.getStorageSync('orders');
    let result = orders[options.index].result;
    that.setData({
      questions:result
    })
  }
})