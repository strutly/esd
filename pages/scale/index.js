var that;
import Api from "../../config/api";
Page({
  data: {
    scales: [],
    end:'',
    state:true
  },
  async onLoad(options) {
    that = this;
    let cid = options.cid;
    let res = await Api.scaleTypes({ cid: cid });
    let res2 = await Api.orcRecord({cid:cid});
    console.log(res);
    that.setData({
      cid: options.cid,
      scales: res.data.formList,
      state:res.data.serveState,
      end:res2.data?'已完成':''
    })
  },
  onReady(){
    that.prompt = that.selectComponent("#prompt");
  },
  async chooseImg(e) {
    let res = await wx.chooseImage({
      count: 1
    })
    console.log(res);
    that.upload(res.tempFilePaths[0]);
  },
  upload(filePath) {
    let cid = that.data.cid;
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: "base64",
      success: function (res) {
        console.log(res);
        let base64 = res.data;
        Api.uploadORCFile({ cid: cid, base64: base64 }).then(res=>{
          console.log(res);
          if(res.code==0){
            that.setData({
              end:"已完成"
            })
          }
        })
      }
    })
  },
  check(){
    let scales = that.data.scales||[];
    let flag = 0;
    scales.forEach(scale=>{
      if(!scale.status){
        flag++;
      }
    })
    if(flag==0){
      that.submit();
    }else if(flag<scales.length){
      that.confirmModal();
    }else{
      that.prompt.showTips("请至少评估一项再生成照护计划!")
    } 
  },
  confirmModal(){
    that.setData({
      confirmModal:!that.data.confirmModal,
      confirmMsg:"尚有未评估的评估项,确认生成照护计划?"
    })
  },
  async submit(){
    console.log(1);
    let res = await Api.addServePlan({
      cid:that.data.cid
    })
    console.log(res);
    if(res.code==0){
      that.confirmModal();
      that.setData({
        successModal:true,
        modalMsg:"照护计划已生成,请查看",
        modalBtn:"确认"
      })
    }
  },
  modalBtn(){
    wx.reLaunch({
      url: '/pages/serve/list',
    })
  },
  order(){
    wx.reLaunch({
      url: '/pages/serve/list',
    })
  }

})