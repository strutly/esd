var that;
import Api from '../../config/api';
Page({
  data: {
    items: []
  },
  async onLoad(options) {
    that = this;
    let res = await Api.servePlanDetail({id:options.planId});
    console.log(res);
    if(res.code==0){
      that.setData({
        plan:res.data
      })
    }
  },
  onReady() {
    that.prompt = that.selectComponent("#prompt");
    that.video = that.selectComponent("#video");
  },
  checkboxChange(e) {
    that.setData({
      items: e.detail.value
    })
  },
  check() {
    let items = that.data.items;
    if (items.length == 0) {
      that.prompt.showTips("请至少勾选一项已完成项目再提交");
      return;
    }
    that.setData({
      handleModal: true,
      itemStr: items.join(";") + "。"
    })
  },
  async submit(e) {
    console.log(e);
    let data = e.detail.value;
    data.items = that.data.items;
    let res = await Api.addServerItem(data)
    console.log(res);
    if (res.code == 0) {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2]; // 上一个页面
      if(prevPage){
        let plans = prevPage.data.plans; // 获取上一页data里的数据
        plans.forEach(plan=>{
          if(plan.id==data.planId){
            plan.countRespVo.if4 = true;
            plan.countRespVo.sum4++;
          }
        });
        prevPage.setData({
          plans:plans
        });
      }
      wx.navigateBack();
    }
  },
  play(e){
    console.log(e);
    that.video.playVideo(e.currentTarget.dataset.url);

  }
})