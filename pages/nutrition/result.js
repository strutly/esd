var that;
const app = getApp();
import util from "../../utils/util";
Page({

  data: {
    msg:"正常营养状态",
    icon:"zhengchang",
    bmi:22,
    level: 0,
    suggest: 1600
  },
  onLoad(options) {
    that = this;
    let btn = true;
    let msg = "";
    let icon = "zhengchang"    
    let order = app.globalData.nutritionOrder;
    let mna = order.score;
    let info = order.info;
    let level = 0;
    let bmi = parseInt((info.weight * 10000) / (info.height * info.height));
    let suggest = parseInt(info.weight * 10 + 6.25 * info.height - 5 * info.age + (info.sex == 1 ? 5 : -161));
    if (bmi >= 28) {
      msg = "营养过剩";
      icon = "yanzhongyinhuan";
      level = 2;
    } else if (bmi > 24) {
      msg = "营养过剩风险";
      icon = "fengxian";
      level = 1;
    } else {
      if (mna <= 12) {
        msg = "营养不良";
        level = 2;
        icon = "yanzhongyinhuan";
      } else if (mna <= 18.5 && mna > 12) {
        msg = "面临营养不良风险";
        level = 1;
        icon = "fengxian"
      } else {
        msg = "正常营养状态";
        level = 0;
        icon = "zhengchang";
        btn = false;
      }
    }
    that.setData({
      btn:btn,
      bmi: bmi,
      msg: msg,
      mna:mna,
      icon: icon,
      level: level,
      suggest: suggest
    })
  },
  order(){
    wx.reLaunch({
      url: '/pages/nutrition/order-list',
    })
  },
  modalBtn(){
    wx.reLaunch({
      url: '/pages/index/home',
    });
  },
  submit(){
    let nutritionOrders = wx.getStorageSync('nutritionOrders')||[];
    let order = app.globalData.nutritionOrder;
    order.createTime = util.formatTime(new Date());
    nutritionOrders.unshift(order);
    wx.setStorageSync('nutritionOrders', nutritionOrders);
    that.setData({
      successModal:!that.data.successModal,
      modalMsg:"预约试用成功,\n请查看",
      modalBtn:"好的"
    })
  }
})