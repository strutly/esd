var that;
const app = getApp();
Page({
  data: {
    fromChange:false,
    questions: [{
      title: "肢体瘫痪",
      category:0,
      type:1,
      show: true,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "正常"        
      }, {
        lable: "存在肢体偏瘫、关节僵硬、胳膊挎篮、足内外翻、足下垂、走路摇晃等表现。"
      }]
    },
    {
      title: "肢体痉挛",
      category:0,
      type:2,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "没有僵直"
      }, {
        lable: "不需要加强试验即可发现有僵直，但关节的活动范围不受限且可轻松达到。"
      }, {
        lable: "不需要加强试验即可发现有僵直；需要用力才能使关节的活动范围不受限。"
      }, {
        lable: "不需要加强试验即可发现有僵直，且关节的活动范围受限。"
      }]
    },
    {
      title: "运动迟缓",
      category:0,
      type:3,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "正常"
      }, {
        lable: "全身性活动和自发性运动存在变慢或减少。"
      }]
    },
    {
      title: "平衡障碍",
      category:0,
      type:4,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "没有问题，可以快速毫不迟疑地站起来。"
      }, {
        lable: "自己手扶扶手即可轻松站起来。"
      }, {
        lable: "需要扶扶手，但容易再跌回椅子上；或是需要尝试一次以上才能扶着扶手站起来，但还是不需要别人帮助。"
      }, {
        lable: "没有别人帮助的情况下站不起来。"
      }]
    },
    {
      title: "步行障碍",
      category:0,
      type:5,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "没有问题。"
      }, {
        lable: "有明显的步态损害但还可以独立行走。"
      }, {
        lable: "需要辅助工具才能安全地行走（拐杖或助行器）但不需要别人的帮助。"
      }, {
        lable: "完全不能行走或是只有在别人的帮助下才能行走。"
      }]
    },
    {
      title: "肌肉衰减",
      category:0,
      type:6,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "正常"
      }, {
        lable: "在过去的一年中出现体重下降3公斤以上或者发生跌倒"
      }]
    },
    {
      title: "关节活动受限",
      category:0,
      type:7,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "正常"
      }, {
        lable: "目测存在关节活动度下降，无法达成预期动作"
      }]
    },
    {
      title: "吞咽功能障碍",
      category:1,
      type:8,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "正常"
      }, {
        lable: "吞咽后咳嗽；进食或饮水后出现声音嘶哑、吞咽过程延长；咀嚼时间延长、吃饭速度下降；吃饭后出现流眼泪或脸部发红；吃饭和饮水以后出现呼吸困难；吞咽时有头颈部的辅助运动"
      }]
    },
    {
      title: "言语功能障碍",
      category:1,
      type:9,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "没有问题。"
      }, {
        lable: "别人偶尔需要我重复说一遍，但不是每天都这样。"
      }, {
        lable: "我说话不清楚，以至于每天都会有人要求我重复说，但大部分内容他们还是能理解。"
      }, {
        lable: "别人大部分时间或完全不能听懂我讲话。"
      }]
    },
    {
      title: "尿便失禁",
      category:1,
      type:10,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "正常"
      }, {
        lable: "在过去的一周内，存在控制排尿的困难，例如，尿急、尿频、或尿失禁"
      }]
    },
    {
      title: "血栓栓塞风险",
      category:1,
      type:11,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "正常"
      }, {
        lable: "存在长期卧床、行动迟缓、下肢肿胀现象，或既往发生过血栓栓塞情况"
      }]
    },
    {
      title: "抑郁情绪",
      category:2,
      type:12,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "没有抑郁情绪。"
      }, {
        lable: "抑郁情绪会持续几天，但不会影响日常生活或社会交往。"
      }, {
        lable: "抑郁情绪影响了患者的日常活动及社会交往，但患者仍能从事这样的活动。"
      }, {
        lable: "抑郁情绪已使患者无法进行日常活动及社会交往。"
      }]
    },
    {
      title: "认知障碍",
      category:2,
      type:13,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "没有认知功能损害。"
      }, {
        lable: "临床上已有明显的认知功能损害，但仅对日常活动或社会交往产生轻微影响。"
      }, {
        lable: "认知功能损害影响了患者的日常活动或社会交往，但患者仍能进行这样的活动。"
      }, {
        lable: "认知功能损害使得患者无法进行正常的日常活动或社会交往。"
      }]
    },
    {
      title: "疼痛",
      category:2,
      type:14,
      show: false,
      checkType: 'radio',
      check: -1,
      checks: [{
        lable: "没有不适的感觉"
      }, {
        lable: "这些不适的感觉使我在做事和与人相处时有一定的困扰"
      }, {
        lable: "这些不适的感觉给我造成很大的困扰，但我仍能做事或与人相处"
      }, {
        lable: "这些不适的感觉使我无法做事或与人相处。"
      }]
    },
    {
      title: "日常生活能力减退",
      category:3,
      type:15,
      show: false,
      checkType: 'checkbox',
      check:[],    
      checks: [{
        title:"进食困难",
        lable: "进食困难：在过去三月内，在进食和使用餐具上有困难.例如，用手拿食物或使用汤勺、筷子有困难",
        value:1
      }, {
        title:"穿衣困难",
        lable: "穿衣困难：在过去三月内，穿衣有困难。例如，穿衣缓慢或需要别人帮忙扣扣子，拉拉链，穿脱衣服",
        value:2
      }, {
        title:"卫生清洁障碍",
        lable: "卫生清洁障碍：在过去三月内，在洗漱、沐浴、刮胡子、刷牙、梳头或是做其它个人卫生时，觉得动作缓慢或是需要帮助",
        value:3
      }]
    }],
    result:{0:{
      肢体瘫痪:-1,
      肢体痉挛:-1,
      运动迟缓:-1,
      平衡障碍:-1,
      步行障碍:-1,
      肌肉衰减:-1,
      关节活动受限:-1
    },1:{
      吞咽功能障碍:-1,
      言语功能障碍:-1,
      尿便失禁:-1,
      血栓栓塞风险:-1
    },2:{
      抑郁情绪:-1,
      认知障碍:-1,
      疼痛:-1
    },3:{
      进食障碍:-1,
      穿衣障碍:-1,
      卫生清洁障碍:-1
    }},
    videoResult:[]
  },
  onLoad: function (options) {
    that = this;
  },
  itemChange(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let questions = that.data.questions;
    let question = questions[index];
    if(question.show) return;
    questions.forEach((item, i) => {
      if (i == index) {
        item.show = !item.show;
      } else {
        item.show = false;
      }
    });
    that.setData({ questions: questions })
  },
  radioChange(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let questions = that.data.questions;
    let question = questions[index];

    if(!question.show) return;

    let val = e.detail.value;
    question.check = val;    
    let result = that.data.result;
    result[question.category][question.title] = question.check>0?1:0;
    let videoResult = that.data.videoResult;
    let setResult = new Set(videoResult);
    if(val>0){
      setResult.add(question.type);
    }else{
      setResult.delete(question.type);
    };
    that.setData({
      ['questions[' + index + ']']: question,
      result:result,
      videoResult:Array.from(setResult),
      fromChange:true
    });    
  },
  radioNormalChange(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let question = that.data.questions[index];
    if(!question.show) return;
    question.check = [0];
    let result = that.data.result;
    let videoResult = that.data.videoResult;
    let setResult = new Set(videoResult);
    setResult.delete(question.type);
    result[question.category] = {
      进食障碍:0,
      穿衣障碍:0,
      卫生清洁障碍:0,
    }
    that.setData({
      ['questions['+index+']']:question,
      result:result,
      videoResult:Array.from(setResult),
      fromChange:true
    })
  },
  checkChange(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let question = that.data.questions[index];
    if(!question.show) return;
    question.check = e.detail.value;

    let result = that.data.result;    
    let value = e.detail.value;
    let checks = [{
      title:"进食障碍",
      lable: "进食困难：在过去三月内，在进食和使用餐具上有困难.例如，用手拿食物或使用汤勺、筷子有困难",
      value:1
    }, {
      title:"穿衣障碍",
      lable: "穿衣困难：在过去三月内，穿衣有困难。例如，穿衣缓慢或需要别人帮忙扣扣子，拉拉链，穿脱衣服",
      value:2
    }, {
      title:"卫生清洁障碍",
      lable: "卫生清洁障碍：在过去三月内，在洗漱、沐浴、刮胡子、刷牙、梳头或是做其它个人卫生时，觉得动作缓慢或是需要帮助",
      value:3
    }];

    result[question.category] = {
      进食障碍:-1,
      穿衣障碍:-1,
      卫生清洁障碍:-1
    };
    let videoResult = that.data.videoResult;
    let setResult = new Set(videoResult);
    value.forEach(val=>{
      let check = checks.find( (check) => {
        return check.value ==val;
      });      
      if(check){
        result[question.category][check.title] = check.value>0?1:0;
      }
    })
    if(value.length>0){
      setResult.add(question.type);
    }else{
      setResult.delete(question.type);
    }  

    that.setData({
      ['questions['+index+']']:question,
      result:result,
      videoResult:Array.from(setResult),
      fromChange:true
    })
  },
  submit() {
    let fromData = wx.getStorageSync('fromData')||[];
    fromData.push({
      result:that.data.result,
      videoResult:that.data.videoResult
    });
    wx.setStorageSync('fromData', fromData);
    wx.reLaunch({
      url: '/pages/disability/result?index='+(fromData.length-1),
    })
  }
})