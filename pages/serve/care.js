var that;
import Api from '../../config/api';
Page({
  data: {
    cares: [{ "title": "照护服务", items: ["头面部清洁、梳理", "洗发", "指/趾甲护理", "手、足部清洁", "温水擦浴", "沐浴", "协助进食/水", "口腔清洁", "协助更衣", "整理床单位", "排泄护理", "失禁护理", "床上使用便器", "人工取便术", "晨间护理", "晚间护理", "会阴护理", "药物管理", "协助翻身叩背排痰", "协助床上移动", "借助器具移动", "皮肤外用药涂擦", "安全护理", "生活自理能力训练", "压疮预防护理", "留置尿管的护理", "人工肛门便袋护理"] }, { "title": "护理服务", items: ["开塞露/直肠栓剂给药", "鼻饲", "药物喂服", "物理降温", "生命体征监测", "吸氧", "灌肠", "导尿女性", "血糖监测", "压疮伤口换药", "静脉血标本采集", "肌肉注射", "皮下注射", "造口护理", "经外周静脉置入", "中心静脉导管PICC维护"] }],
    items: []
  },
  onLoad(options) {
    that = this;
    that.setData({
      planId: options.planId
    })
  },
  onReady() {
    that.prompt = that.selectComponent("#prompt");
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
            plan.countRespVo.if1 = true;
            plan.countRespVo.sum1++;
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