var that;
Page({
  data: {
    info:{sex:"性别",age:"年龄",height:"身高",weight:"体重"},
    questions: [{
      "title": "过去三个月内有没有因为食欲不振、消化问题、咀嚼或吞咽困难而减少食量?",
      "type": "alone",
      "items": {
        "0": "食量严重减少",
        "1": "食量中度减少",
        "2": "食量没有改变"
      }
    }, {
      "title": "过去三个月内体重下降的情况",
      "type": "alone",
      "items": {
        "0": "体重下降大于3公斤",
        "1": "不知道",
        "2": "体重下降1-3公斤",
        "3": "体重没有下降"
      }
    }, {
      "title": "活动能力",
      "type": "alone",
      "items": {
        "0": "需要长期卧床或坐轮椅",
        "1": "可以下床或离开轮椅",
        "2": "可以外出"
      }
    }, {
      "title": "过去三个月内有没有受到心理创伤或患者急性疾病",
      "type": "alone",
      "items": {
        "0": "有",
        "2": "无"
      }
    }, {
      "title": "可以独立生活(非居住于养老院或医院)",
      "type": "alone",
      "items": {
        "0": "否",
        "1": "是"
      }
    }, {
      "title": "每天需服用三种以上的处方药物",
      "type": "alone",
      "items": {
        "0": "是",
        "1": "否"
      }
    }, {
      "title": "是否有褥疮或皮肤溃疡",
      "type": "alone",
      "items": {
        "0": "是",
        "1": "否"
      }
    }, {
      "title": "每天可以吃几次完整的餐食",
      "type": "alone",
      "items": {
        "0": "1餐",
        "1": "2餐",
        "2": "3餐"
      }
    }, {
      "title": "蛋白质摄入量",
      "type": "gather",
      "questions": [{
        "title": "每天至少进食一份乳制品(牛奶或其他乳制品)",
        "items": {
          "0": "否",
          "1": "是"
        }
      }, {
        "title": "每周进食两份以上豆类或蛋类",
        "items": {
          "0": "否",
          "1": "是"
        }
      }, {
        "title": "每天均吃些肉、鱼、鸡鸭类",
        "items": {
          "0": "否",
          "1": "是"
        }
      }]
    }, {
      "title": "每天有进食两份或两份以上的蔬菜或水果?",
      "type": "alone",
      "items": {
        "0": "否",
        "1": "是"
      }
    }, {
      "title": "每天喝多少流质(水、果汁、咖啡、茶、牛奶等)?",
      "type": "alone",
      "items": {
        "0": "少于3杯",
        "1": "多于5杯",
        "0.5": "3 至 5杯"
      }
    }, {
      "title": "进食模式",
      "type": "alone",
      "items": {
        "0": "需辅助才能进食",
        "1": "能自行进食但稍有困难",
        "2": "能自行进食"
      }
    }, {
      "title": "自我评估营养状况",
      "type": "alone",
      "items": {
        "0": "觉得自己营养状况非常不好",
        "1": "不太清楚或营养状况不太好",
        "2": "觉得自己营养状况一切正常"
      }
    }, {
      "title": "与其他同龄的人比较,病人如何评价自己的健康状况?",
      "type": "alone",
      "items": {
        "0": "不如同年龄的人",
        "1": "和同年龄的人差不多",
        "2": "比同年龄的人好",
        "0.5": "不知道"
      }
    }, {
      "title": "臂中围(MAC)(公分,cm)",
      "type": "alone",
      "items": {
        "0": "MAC < 21",
        "1": "MAC ≥ 22",
        "0.5": "MAC 21~21.9"
      }
    }, {
      "title": "小腿围(CC)(公分,cm)",
      "type": "alone",
      "items": {
        "0": "CC < 31",
        "1": " CC ≥ 31"
      }
    }],
    sexArray: ['未知', '男', '女'],
    symptoms: ['严重压疮', '严重痔疮', '严重疝气', '肛瘘', '严重便秘'],
  },

  onLoad(options) {
    that = this;
    let nutritionOrders = wx.getStorageSync('nutritionOrders');
    let order = nutritionOrders[options.index];
    let mna = order.score;
    let result = order.result;
    
    let gatherResult = [];
    Object.keys(result).forEach(key=>{
      
      if(key.includes("8")){
        gatherResult.push(result[key]);
      }
    });
    let length = gatherResult.filter(item=>{
      return item>0;
    }).length;
    let sizeScore = {0:0,1:0,2:0.5,3:1};
    result[8] = sizeScore[length];

    let info = order.info;
    let level = 0;
    let btn = true;
    let msg = "";
    let icon = "zhengchang"   
    let bmi = parseInt((10000 * info.weight) / (info.height * info.height));
    let suggest = parseInt(10 * info.weight + 6.25 * info.height - 5 * info.age + (info.sex == 1 ? 5 : -161));
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
      order: order,
      btn: btn,
      bmi: bmi,
      msg: msg,
      icon: icon,
      level: level,
      suggest: suggest
    })
  },
  search(e) {
    console.log(e);
    let val = e.detail.value;
    let orders = wx.getStorageSync('orders') || [];
    orders = orders.filter(item => {
      return item.info.name.includes(val);
    })
    that.setData({
      orders: orders
    })
  }
})