var that,videoContext;
Page({
  data: {
    direction:0
  },
  onLoad(options) {
    that = this;
  },
  playVideo(e) {
    that = this;
    console.log(e);
    //执行全屏方法  
    videoContext = wx.createVideoContext('myvideo', that);
    videoContext.requestFullScreen();
    that.setData({
      playVideo: true,
      direction: 90,
      url: e.currentTarget.dataset.url
    })
  },
  /**关闭视屏 */
  closeVideo() {
    //执行退出全屏方法
    var videoContext = wx.createVideoContext('myvideo', this);
    videoContext.exitFullScreen();
  },
  hiddenVideo() {
    that.setData({
      playVideo: false
    })
  },
  screenChange(e) {
    console.log(e);
    let fullScreen = e.detail.fullScreen;
    if (fullScreen) {
      videoContext.requestFullScreen();
      that.setData({
        direction: 90
      })
    } else {
      that.setData({
        playVideo: false
      })
    }
  },
})