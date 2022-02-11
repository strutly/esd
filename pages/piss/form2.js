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
        logo: "qutishineng",
        msg: "非失能",
        questions: [
          {
            title: "大便次数每周少于3次",
            fun:"check",
            checked: false,
          }, {
            title: "大便干硬",
            fun:"check",
            checked: false,
          }, {
            title: "每次排便困难",
            fun:"check",
            checked: false,
          }, {
            title: "下腹经常胀痛，排尿困难",
            fun:"check",
            checked: false,
          }, {
            title: "排尿不畅、尿频，常有尿不尽感",
            fun:"check",
            checked: false,
          }, {
            title: "咳嗽、打喷嚏或运动时，会不由自主排出尿液",
            fun:"check",
            checked: false,
          }, {
            title: "平时不动，会不由自主排出尿液",
            fun:"check",
            checked: false,
          }]
      }, {
        logo: "shinenglaoren",
        msg: "失能",
        questions: [{
          title: "干便失禁",
          type:"incontinence",
          fun:"check",
          checked: false,
        }, {
          title: "湿便失禁",
          type:"incontinence",
          fun:"check",
          checked: false,
        }, {
          title: "以上都有",
          fun:"above",
          type:"above",
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
        logo: "ready",
        msg: "评估完成，符合推荐方案，请填写评估者的个人信息",
        notUse:true,
        sexArray: ['请选择性别', '男', '女'],
        formData: { sex: 0 }
      }
    ]
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
  prompt(msg) {
    that.setData({
      prompt: true,
      promptMsg: msg
    });
    setTimeout(function () {
      that.setData({
        prompt: false,
        promptMsg: ''
      })
    }, 1500);
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
    console.log(questions)
    let question = questions[i].questions[index];
    question.checked = !question.checked;
    let flag = true;
    questions[i].questions.forEach(item=>{
      if(item.type == "incontinence" && flag){
        flag = item.checked;
      }
      if(item.type == "above"){
        item.checked = flag;
      }
    });


    that.setData({
      questions: questions
    })
  },
  above(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let i = that.data.index;
    let questions = that.data.questions;
    console.log(questions);
    let question = questions[i].questions[index];
    question.checked = !question.checked;
    questions[i].questions.forEach(item=>{
      if(item.type == "incontinence"){
        item.checked = question.checked;
      }
    })
    that.setData({
      questions: questions
    })
  },
  pickerChange(e) {
    console.log(e);
    let length = that.data.questions.length - 1;
    that.setData({
      ['questions[' + length + '].formData.sex']: e.detail.value
    })
  },
  end() {
    let flag = true;
    let index = that.data.index;
    let questions = that.data.questions;
    let result = questions[index].questions.filter(item=>item.checked);
    console.log(result)

    if(result.length==0){
      return that.prompt("请至少选择一个选项~");
    }

    result.forEach(r=>{
      console.log(r)
      if(r.notUse){
        flag = false;
      }
    })
    if(flag){
      that.setData({
        type: "info",
        index: 3,
        result:result
      })
    }else{
      that.setData({
        modal:!that.data.modal,
        modalMsg:"您的测评不符合推荐条件，建议不采用智能大小便清理方案",
        modalBtn:"好的"
      })
    }
  },
  modalBtn(){
    that.setData({
      modal:!that.data.modal
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
      that.prompt(error.msg)
      return false;
    } 
    let order = {};
    order.info = data;
    order.classify = that.data.classify;
    order.result = that.data.result;
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