var that,videoContext;
Page({
  data: {
    result:{},
    videos:{
      1:[{
        title:"①良好肢位的摆放",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/84eff072387702294109278701/OuosutNWAGEA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/01.png"
      },{
        title:"②翻身动作",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/84effa1e387702294109278992/Y4MttoZ8Kl0A.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/02.png"
      },{
        title:"③坐起训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/82856a73387702294109162890/4tGZctUoShkA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/03.png"
      },{
        title:"④针对患侧上肢的作业训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/84fd8954387702294109280098/9Q0jSGkJC0YA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/04.png"
      },{
        title:"⑤感觉刺激方法",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/84fd90eb387702294109280224/1u4tDhzZSdMA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/05.png"
      }],
      2:[{
        title:"①抑制痉挛训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/86c44594387702294109304983/6k5JC2bl3PgA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/06.png"
      },{
        title:"②被动活动",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/829812af387702294109173920/YXAuGFRcapsA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/07.png"
      }],
      3:[{
        title:"①移乘训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/86c440b0387702294109304835/ia4DRaRx3DQA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/08.png"
      }],
      4:[{
        title:"①站起站立训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/8285dcd0387702294109163256/A6BNhyKHp9IA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/09.png"
      },{
        title:"②坐位训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/8285d406387702294109163030/HkaxWelRroQA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/10.png"
      },{
        title:"③爬位跪位爬行跪行训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/8500d6ef387702294109286123/cdUsTLubNcYA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/11.png"
      }],
      5:[{
        title:"①步行训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/8285e4ab387702294109163404/IPLZlb9dUMsA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/12.png"
      },{
        title:"②偏瘫步态训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/be81b80e387702294110343487/yso1ta6llC0A.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/13.png"
      }],
      6:[{
        title:"①肌肉衰减的抗阻力训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/be81410f387702294110342993/dSeCd5aNEtgA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/14.png"
      }],
      7:[{
        title:"①肩关节活动度训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c2e43bed387702294110504667/W4OoSgKooAUA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/15.png"
      },{
        title:"②偏瘫下肢活动度训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/bea66be8387702294110364208/8ia0iVSnP14A.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/16.png"
      },{
        title:"③膝关节活动度训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c122a19a387702294110489938/1zVbLK0AdjoA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/17.png"
      },{
        title:"④偏瘫后腕关节训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c1220037387702294110488459/UiMDnpTY5NsA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/18.png"
      }],
      8:[{
        title:"①口唇肌肉训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c2e43fc4387702294110504730/9p4qujTJsoQA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/19.png"
      },{
        title:"②吞咽障碍口腔训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c0e8e781387702294110453031/7A4fvoK2m9AA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/20.png"
      }],
      9:[{
        title:"①言语功能训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c363736d387702294110575632/WEU98zd4A1YA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/21.png"
      }],
      10:[{
        title:"①盆底功能训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/5e8180d0387702293493231525/xamrlkBGU5EA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/22.png"
      }],
      11:[{
        title:"①预防下肢深静脉血栓操",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c0e909ca387702294110453850/MXlBBeFOL38A.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/23.png"
      }],
      12:[{
        title:"①情绪康复",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/be823787387702294110344173/Ok0LueyLPVsA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/24.png"
      }],
      13:[{
        title:"①认知训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c2e4c808387702294110505643/eUhRjV7GQAUA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/25.png"
      }],
      
      15:[{
        title:"①日常生活动作训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/86c4bba6387702294109305401/Xd09K12wmVgA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/26.png"
      },{
        title:"②日常生活活动能力训练",
        url:"https://1308944528.vod2.myqcloud.com/00b98b8evodcq1308944528/c1228433387702294110489265/UHHHxJ5rVjAA.mp4",
        cover:"https://7265-rehab-2gahhvf3d6f7740e-1309153121.tcb.qcloud.la/27.png"
      }]
    },
    practices:{1:"肢体康复训练",2:"抗痉挛放松训练",3:"转移训练",4:"平衡训练",5:"步行训练",6:"抗阻力训练",7:"关节活动度训练",8:"吞咽功能训练",9:"言语功能训练",10:"盆底功能训练",11:"防下肢静脉血栓训练",12:"情绪康复",13:"认知功能康复",14:"疼痛康复",15:"日常生活能力训练"},
    categorys:["运动功能障碍","非运动功能障碍","情绪认知障碍","日常生活能力减退"]

  },
  onLoad: function (options) {
    that = this;
    let index = options.index;
    let results = wx.getStorageSync('fromData');
    let videoResult = results[index].videoResult;
    console.log(videoResult);
    let videos = that.data.videos;
    let showVideos = {};
    Reflect.ownKeys(videos).forEach(key=>{
      if(videoResult.findIndex(val=>key==val)>-1){
        showVideos[key]=videos[key];
      }      
    });

    that.setData({      
      result:results[index].result,
      videoResult:results[index].videoResult,
      showVideos:showVideos
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