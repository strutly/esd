var that;
import WxValidate from '../../utils/WxValidate.js';
import util from "../../utils/util";
Page({
  data: {
    index: 0,
    type: 'type',
    questions: [
      {
        logo: "pinggu",
        msg: "请选择评估对象的失能情况",
        symptoms: ["失能", "非失能"]
      }, {
        logo: "shinenglaoren",
        msg: "失能",
        questions: [{
          title: "干便失禁",
          type:"big1",
          fun:"check",
          checked: false,
        }, {
          title: "湿便失禁",
          type:"big1",
          fun:"check",
          checked: false,
        }, {
          title: "是否有严重痔疮",
          fun:"check",
          notUse:true,
          checked: false,
        }, {
          title: "大腿有无变形",
          fun:"check",
          notUse:true,
          checked: false,
        }, {
          title: "皮肤有无褥疮、严重皮炎或破损",
          fun:"check",
          notUse:true,
          checked: false,
        }, {
          title: "是否有精神狂躁行为",
          fun:"check",
          notUse:true,
          des: "(如：撕被子、手抓大便、拉扯尿不湿)",
          checked: false,
        }, {
          title: "有无导尿管、有无尿量监测使用记录者。",
          fun:"check",
          notUse:true,
          checked: false,
        }]
      }, {
        logo: "qutishineng",
        msg: "非失能",
        questions: [
          {
            title: "大便次数每周少于3次",
            fun:"check",
            type:"big",
            checked: false,
          }, {
            title: "大便干硬",
            fun:"check",
            type:"big",
            checked: false,
          }, {
            title: "每次排便困难",
            fun:"check",
            type:"big",
            checked: false,
          }, {
            title: "下腹经常胀痛，排尿困难",
            fun:"check",
            type:"small",
            checked: false,
          }, {
            title: "排尿不畅、尿频，常有尿不尽感",
            fun:"check",
            type:"small",
            checked: false,
          }, {
            title: "咳嗽、打喷嚏或运动时，会不由自主排出尿液",
            fun:"check",
            type:"small1",
            checked: false,
          }, {
            title: "平时不动，会不由自主排出尿液",
            fun:"check",
            type:"small1",
            checked: false,
          }]
      }, {
        logo: "body",
        msg: "请填写评估者的个人信息",
        notUse:true,
        sexArray: ['请选择性别', '男', '女'],
        formData: { sex: 0 }
      }
    ],
    care:{
      big:{
        min:2,
        symptom:"便秘",
        matters:["建议照护对象每天早上起来之后，用温水冲一杯蜂蜜水或淡盐水，饮食要规律，每天多吃一些粗粮和新鲜的水果蔬菜，每天至少都要喝两升水，也可以喝适量的酸奶，可以调节肠道菌落，有助于排便。","指导照护对象养成良好的排便习惯，尽可能每日早餐后排便(因早餐后易引起胃-结肠反射，此时训练排便，易建立条件反射)","指导照护对象挤压天枢穴，对治疗便秘有良好效果。"]
      },
      big1:{
        min:1,
        symptom:"大便失禁",
        matters:["一次性尿垫，有大便后一定要及时更换；每次处理完大便，涂抹软膏保护照护对象的肛周皮肤。","保持皮肤清洁干燥，减轻皮肤受压，每隔2小时给照护对象变换1次体位，防止褥疮。","加强与照护对象的沟通，引导照护对象说出自己的痛苦、委屈及内心的不安，注重心理照护。"]
      },
      small:{
        min:1,
        symptom:"尿潴留",
        matters:["建议照护对象饮食以清淡、易消化为主，适当控制饮水量，戒烟戒酒，限制厚味、辛辣刺激性食物。多食蔬菜、大豆制品及粗粮。","利用某些条件反射诱导排尿，如：听细细的流水声。用温水冲洗会阴或温水坐浴；双手浸在温水中等等。","热敷下腹部及用手按摩下腹部，可放松肌肉，促进排尿。切记不可强力按压，以防膀胱破裂。"]
      },
      small1:{
        min:1,
        symptom:"尿失禁",
        matters:["注意照护对象的皮肤护理，定时用温水清洗会阴部，防止褥疮，或者随时保持皮肤清洁干燥。","观察排尿反应，记录失禁的次数、间隔时间及尿量，以此为依据分析照护对象的排尿习惯，确定膀胱的功能性容量。","改善生活环境中可能影响照护对象如厕的因素，如升高马桶座、厕所内增加扶手等等。","指导照护对象有意识对肛提肌为主的盆底肌肉进行自主性收缩，以增强控尿能力，排尿过程中，主动中断排尿，之后自继续排尿。"]
      }
    }

  },
  onLoad(options) {
    that = this;
    that.initValidate();    
  },
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength:2
      },
      phone:{
        required:true,
        tel:true
      },
      age:{
        required: true,
        min:16
      },
      sex:{
        min:1
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength:'请输入正确的姓名'
      },
      phone:{
        required:'请填写手机号',
        tel:'请填写正确的手机号'
      },
      age:{
        required: '请输入年龄',
        min:"年龄不能小于16岁"
      },
      sex:{
        min:"请选择性别"
      }
    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  onReady(){
    that.prompt = that.selectComponent("#prompt");
  },
  checkType(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    that.setData({
      type: 'question',
      classify:index,
      index: 1 + e.currentTarget.dataset.index
    })
  },
  check(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let i = that.data.index;
    let questions = that.data.questions;
    let question = questions[i].questions[index];
    question.checked = !question.checked;
    /*let flag = true;
    questions[i].questions.forEach(item=>{
      if(item.type == "incontinence" && flag){
        flag = item.checked;
      }
      if(item.type == "above"){
        item.checked = flag;
      }
    });*/

    that.setData({
      questions: questions
    })
  },
  // above(e){
  //   console.log(e);
  //   let index = e.currentTarget.dataset.index;
  //   let i = that.data.index;
  //   let questions = that.data.questions;
  //   console.log(questions);
  //   let question = questions[i].questions[index];
  //   question.checked = !question.checked;
  //   questions[i].questions.forEach(item=>{
  //     if(item.type == "incontinence"){
  //       item.checked = question.checked;
  //     }
  //   })
  //   that.setData({
  //     questions: questions
  //   })
  // },
  pickerChange(e) {
    console.log(e);
    let length = that.data.questions.length - 1;
    let questions = that.data.questions;
    let question = questions[length];
    question.formData.sex = e.detail.value;
    that.setData({
      questions:questions
    })
  },
  end() {
    let flag = true;
    let index = that.data.index;
    let questions = that.data.questions;
    let result = questions[index].questions.filter(item=>item.checked);
    console.log(result);
    if(result.length==0){
      return that.prompt.showTips("请至少选择一个选项~");
    }
    let care = that.data.care;
    let cares = {};
    result.forEach(r=>{
      console.log(r);
      if(!cares[r.type]){
        cares[r.type] = 0;
      }
      cares[r.type]+=1;
      if(r.notUse){
        flag = false;
      }
    })
    console.log(cares)
    let needCares = [];
    Object.keys(cares).forEach(item=>{
      if(care[item] && care[item].min && cares[item]>=care[item].min){
        needCares.push(care[item]);
      }
    })
    let classify = that.data.classify;
    if(!classify){
      questions[3].logo = "ready";
      questions[3].msg = "评估完成，符合推荐方案，请填写评估者的个人信息";
    }


    if(!flag){
      questions[3].logo = "bufuheyaoqiu";
      questions[3].msg = "评估完成，不符合推荐方案，请填写评估者的个人信息";
    }      
    that.setData({
      cares:needCares,
      type: "info",
      index: 3,
      result:result,
      fit:flag,
      questions:questions
    })    
  },
  modalBtn(){
    wx.reLaunch({
      url: '/pages/piss/index'
    })
  },
  order(){
    wx.reLaunch({
      url: '/pages/piss/order'
    })
  },
  submitForm(e) {
    console.log(e);
    let data = e.detail.value;
    if (!that.WxValidate.checkForm(data)) {
      let error = that.WxValidate.errorList[0]
      that.prompt.showTips(error.msg)
      return false;
    } 
    let order = {};
    order.info = data;
    order.classify = that.data.classify;
    order.result = that.data.result;
    order.fit = that.data.fit;
    order.cares = that.data.cares;
    order.createTime = util.formatTime(new Date());
    let orders = wx.getStorageSync('pissOrder')||[];    
    orders.unshift(order);
    wx.setStorageSync('pissOrder', orders);
    that.setData({
      successModal:!that.data.successModal,
      modalMsg:"预约试用成功,\n请查看",
      modalBtn:"好的"
    })
  }
})