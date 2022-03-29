var that;
import Api from "../../config/api";
Page({
  data: {
    scales: [],
    end:''
  },
  async onLoad(options) {
    that = this;
    let cid = options.cid;
    let res = await Api.scaleTypes({ cid: cid });    
    console.log(res);
    that.setData({
      planId:options.planId,
      cid: options.cid,
      scales: res.data.formList,
      state:res.data.serveState,
    })
  },
  onReady(){
    that.prompt = that.selectComponent("#prompt");
  },
  check(){
    let scales = that.data.scales||[];
    let flag = 0;
    scales.forEach(scale=>{
      if(!scale.planId){
        flag++;
      }
    })
    if(flag==0){
      that.submit();
    }else{
      that.confirmModal();
    } 
  },
  confirmModal(){
    that.setData({
      confirmModal:!that.data.confirmModal,
      confirmMsg:"尚有未确认的评估项,确认完成?"
    })
  },
  async submit(){
    console.log(1);
    let planId = that.data.planId
    let res = await Api.stageServerItem({
      type:5,
      planId:planId
    })
    if (res.code == 0) {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2]; // 上一个页面
      if(prevPage){
        let plans = prevPage.data.plans; // 获取上一页data里的数据
        plans.forEach(plan=>{
          if(plan.id==planId){
            plan.countRespVo.sum5 = 1;
          }
        });
        prevPage.setData({
          plans:plans
        });
      }
      wx.navigateBack();
    }
  }

})