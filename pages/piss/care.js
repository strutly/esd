var that;
Page({
  data: {

  },
  onLoad(options) {
    that = this;
    let index = options.orderIndex;
    let order = wx.getStorageSync('pissOrder')[index] || {};
    that.setData({
      order:order
    })
  }
})