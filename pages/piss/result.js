var that;
Page({

  data: {
    symptoms:['失能','未失能'],
    sexArray:['未知','男','女']
  },

  onLoad(options) {
    that = this;
    let orders = wx.getStorageSync('pissOrder')||[];
    let order = orders[options.index];
    that.setData({
      order:order,
      index:options.index
    })
  },
  server(){
    wx.navigateTo({
      url: '/pages/piss/serve',
    })
  }
})