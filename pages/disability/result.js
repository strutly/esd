var ItemGroupBy = function(arr, key) {
  let newArr = [],
      types = {},
      newItem, i, j, cur;
  for (i = 0, j = arr.length; i < j; i++) {
      cur = arr[i];
      if (!(cur[key] in types)) {
          types[cur[key]] = { type: cur[key], data: [] };
          newArr.push(types[cur[key]]);
      }
      types[cur[key]].data.push(cur);
  }
  return newArr;
},that,videoContext;
Page({
  data: {
    direction:0,
    types:['正常','轻度','中度','重度'],
    newResult:[{
      data:[[],[],[],[],[],[],[],[],[],[],[],[],[]],
      type:0
    },{
      data:[[]],
      type:1
    },{
      data:[[]],
      type:2
    },{
      data:[[]],
      type:3
    }],
    practice:[{
      type:3,
      title:"肢体痉挛",
      videos:[{title:"①抑制痉挛训练",url:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/10%E6%8A%91%E5%88%B6%E7%97%89%E6%8C%9B%E8%AE%AD%E7%BB%83.mp4",cover:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/%E6%8A%91%E5%88%B6%E7%97%89%E6%8C%9B%E8%AE%AD%E7%BB%83.png"},{title:"②被动活动",url:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/02%E8%A2%AB%E5%8A%A8%E6%B4%BB%E5%8A%A8.mp4",cover:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/被动活动.png"}]
    },{
      type:2,
      title:"平衡障碍",
      videos:[{title:"①站起站立训练",url:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/07%E7%AB%99%E8%B5%B7%E7%AB%99%E7%AB%8B%E8%AE%AD%E7%BB%83.mp4",cover:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/站起占位训练.png"},{title:"②坐位训练",url:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/05%E5%9D%90%E4%BD%8D%E8%AE%AD%E7%BB%83.mp4",cover:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/座位训练.png"},{title:"③爬位跪位爬行跪行训练",url:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/06%E7%88%AC%E4%BD%8D%E8%B7%AA%E4%BD%8D%E7%88%AC%E8%A1%8C%E8%B7%AA%E8%A1%8C%E8%AE%AD%E7%BB%83.mp4",cover:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/爬位跪位爬行跪行训练.png"}]
    },{
      type:1,
      title:"运动迟缓",
      videos:[{title:"①移乘训练",url:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/09%E7%A7%BB%E4%B9%98%E8%AE%AD%E7%BB%83.mp4",cover:"https://6870-hpmp-0gc3hyp495d12e28-1301665033.tcb.qcloud.la/移乘训练.png"}]
    },
    
    ]

  },
  onLoad: function (options) {
    that = this;
    let results = wx.getStorageSync('results') || [];
    let result = results[options.index];
    let newResult = [{
      data:[[],[],[],[],[],[],[],[],[],[],[],[],[]],
      type:0
    },{
      data:[[]],
      type:1
    },{
      data:[[]],
      type:2
    },{
      data:[[]],
      type:3
    }].sort((n1,n2)=>{
      if(n1.type==0 || n2.type==0){
        return n1.type-n2.type; 
      }
      return n2.type-n1.type;        
    });
    that.setData({
      newResult:newResult,
      result:result,
      index:options.index
    });
  },
  playVideo(e){
    console.log(e);
     //执行全屏方法  
     videoContext = wx.createVideoContext('myvideo', that);
     videoContext.requestFullScreen();
     that.setData({
       playVideo:true,
       direction:90,
       url:e.currentTarget.dataset.url
     })
  },
  play(e) {
    //执行全屏方法  
    var videoContext = wx.createVideoContext('myvideo', this);
    videoContext.requestFullScreen();
    that.setData({
      playVideo:true,
      direction:90,
      url:e.currentTarget.dataset.url
    })
 },
 /**关闭视屏 */
 closeVideo() {
   //执行退出全屏方法
   var videoContext = wx.createVideoContext('myvideo', this);
   videoContext.exitFullScreen();     
 },
 /**视屏进入、退出全屏 */
 fullScreen(e){
   var isFull = e.detail.fullScreen;
   //视屏全屏时显示加载video，非全屏时，不显示加载video
   this.setData({
    direction:90,
   })
 },
  


  hiddenVideo(){
    that.setData({
      playVideo:false
    })    
  },
  screenChange(e){
    console.log(e);
    let fullScreen = e.detail.fullScreen;
    if(fullScreen){
      direction = 90;
      videoContext.requestFullScreen();
      that.setData({
        direction:90
      })
    }else{
      that.setData({
        playVideo:false
      }) 
    }
    
  },
  detail(){
    wx.navigateTo({
      url: '/pages/disability/detail?index='+that.data.index,
    })
  }

})