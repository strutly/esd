var that,videoContext;
Page({
  data: {
    direction:0
  },
  onLoad(options) {
    that = this;
  },
  onReady(){
    that.video = that.selectComponent("#video");
  },
  playVideo(e){
    console.log(e);
    that.video.playVideo(e.currentTarget.dataset.url);

  }
})