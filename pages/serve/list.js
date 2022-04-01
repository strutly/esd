var that;
import Api from '../../config/api';
Page({
  data: {
    plans:[],
    openIndex:-1
  },
  onLoad(options) {
    console.log(options)
    that = this;    
    that.getList("",1);
  },
  async getList(name,pageNum){
    let res = await Api.servePlanPage({name:name,pageNum:pageNum});
    console.log(res);
    let plans = that.data.plans||[];
    console.log(res.data.content);    
    plans = plans.concat(res.data.content);
    that.setData({
      pageNum:pageNum,
      name:name,
      endline: res.data.last,
      plans:plans      
    });
  },
  search(e){
    let val = e.detail.value;
    let reg = /^[a-zA-Z]+$/;
    if (reg.test(val))return;
    that.setData({
      plans:[],
      openIndex:-1,
      name:val
    });
    that.getList(val,1)
  },
  onReachBottom(){
    let endline = that.data.endline;
    if(!endline){
      let pageNum = that.data.pageNum + 1;
      let name = that.data.name;
      that.getList(name,pageNum);
    }    
  },
  async getCount(index){
    let plans = that.data.plans;
    let plan = plans[index];
    console.log(plan)
    let res = await Api.serveItemByPlanId({
      planId:plan.id
    })
    if(res.code==0){
      plan.countRespVo = res.data;
      that.setData({
        plans:plans
      })
    }
  },
  async open(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let plans = that.data.plans;
    let plan = plans[index];
    if(!plan.countRespVo){
      that.getCount(index);
    }
    let openIndex = that.data.openIndex;
    if(openIndex==index){
      openIndex = -1;
    }else{
      openIndex = index;
    }
    that.setData({
      openIndex:openIndex
    })
  },
  toHref(e){
    console.log(e);
    wx.navigateTo({
      url: e.currentTarget.dataset.href,
    })
  },
  handleModal(e){
    console.log(e);
    that.setData({
      planId:e.currentTarget.dataset.id,
      type:e.currentTarget.dataset.type,
      handleModal:!that.data.handleModal
    })
  },
  async submit(e){
    console.log(e);
    let data = e.detail.value;
    let res = await Api.addServerItem(data);
    console.log(res);
    if(res.code==0){
      let plans = that.data.plans;
      let openIndex = that.data.openIndex;
      let plan = plans[openIndex];
      if(data.type==2){
        plan.countRespVo.if2 = true;
        plan.countRespVo.sum2++;
      }else{
        plan.countRespVo.if3 = true;
        plan.countRespVo.sum3++;
      }      
      that.setData({
        plans:plans,
        handleModal:!that.data.handleModal
      })      
    }
  }
})