var that;
import WxValidate from '../../utils/WxValidate.js';
import util from "../../utils/util";
Page({
  data: {
    index:0,
    questions:[{
      title:"大便情况",
      logo:"dabian",
      btn:"下一项",
      fun:'next',
      questions: [
        {
          title: "照护对象能否自主大便",
          checks: [{
            checked: false,
            lable: "自主"
          }, {
            checked: false,
            lable: "失能"
          }, {
            checked: false,
            lable: "偶尔失能"
          }]
        }, {
          title: "照护对象是否便秘",
          checks: [{
            checked: false,
            lable: "没有"
          }, {
            checked: false,
            lable: "2-3天"
          }, {
            checked: false,
            lable: "3天以上"
          }]
        }, {
          title: "大便是否干硬",
          checks: [{
            checked: false,
            lable: "很硬"
          }, {
            checked: false,
            lable: "一般"
          }, {
            checked: false,
            lable: "拉稀状"
          }]
        }, {
          title: "异味是否明显",
          checks: [{
            checked: false,
            lable: "不及时清理,房间很臭"
          }, {
            checked: false,
            lable: "不明显"
          }, {
            checked: false,
            lable: "几乎没有"
          }]
        },
      ]
    },{
      title:"小便情况",
      logo:"xiaobianqi",
      btn:"下一项",
      fun:'next',
      questions: [
        {
          title: "照护对象能否自主小便",
          checks: [{
            checked: false,
            lable: "自主"
          }, {
            checked: false,
            lable: "失能"
          }, {
            checked: false,
            lable: "偶尔失能"
          }]
        }, {
          title: "照护对象能否使用导尿管",
          checks: [{
            checked: false,
            lable: "使用"
          }, {
            checked: false,
            lable: "不使用"
          },]
        }, {
          title: "大便是否需测量尿液",
          checks: [{
            checked: false,
            lable: "需测量尿液"
          }, {
            checked: false,
            lable: "不需测量尿液"
          }]
        }
      ]
    },{
      title:"排便规律",
      logo:"order-of-classes",
      btn:"下一项",
      fun:'next',
      questions: [
        {
          title: "照护对象一般进食多久后排便",
          checks: [{
            checked: false,
            lable: "进食后1-2小时排便"
          }, {
            checked: false,
            lable: "进食后2-3小时排便"
          }, {
            checked: false,
            lable: "进食后3小时以上排便"
          }]
        }, {
          title: "照护对象是否夜间排便",
          checks: [{
            checked: false,
            lable: "经常"
          }, {
            checked: false,
            lable: "偶尔"
          },{
            checked: false,
            lable: "基本不"
          }]
        }
      ]
    },{
      title:"照护情况",
      logo:"xixinzhaohu",
      btn:"下一项",
      fun:'next',
      questions: [
        {
          title: "照护对象排便后清理响应",
          checks: [{
            checked: false,
            lable: "照护对象提示，立即清理"
          }, {
            checked: false,
            lable: "照护师发现后清理"
          }, {
            checked: false,
            lable: "什么时候有空再清理"
          }]
        }, {
          title: "清理时是否清洁、消毒肛周皮肤",
          checks: [{
            checked: false,
            lable: "每次都清洁、消毒"
          }, {
            checked: false,
            lable: "偶尔清洁、消毒"
          },{
            checked: false,
            lable: "基本不清洁、消毒"
          }]
        }, {
          title: "照护对象的纸尿裤更换频率",
          checks: [{
            checked: false,
            lable: "每次更换"
          }, {
            checked: false,
            lable: "一天更换一次"
          }]
        }
      ]
    },{
      title:"个人特征",
      logo:"body",
      btn:"下一项",
      fun:'next',
      questions: [
        {
          title: "照护对象隐私意识强",
          checks: [{
            checked: false,
            lable: "特别强，每次照护要特别注意"
          }, {
            checked: false,
            lable: "强，但每次照护比较配合"
          }, {
            checked: false,
            lable: "一般，每次照护也很配合"
          }]
        }, {
          title: "照护对象个人卫生意识强",
          checks: [{
            checked: false,
            lable: "特别注意，要及时清理"
          }, {
            checked: false,
            lable: "一般，等照护师清理"
          }]
        }, {
          title: "照护对象有无痔疮",
          checks: [{
            checked: false,
            lable: "有"
          }, {
            checked: false,
            lable: "无"
          }]
        }, {
          title: "照护对象大腿有无变形",
          checks: [{
            checked: false,
            lable: "严重变形"
          }, {
            checked: false,
            lable: "轻微变形"
          }, {
            checked: false,
            lable: "无"
          }]
        }, {
          title: "照护对象是否皮肤无褥疮、严重皮炎或破损者",
          checks: [{
            checked: false,
            lable: "有"
          }, {
            checked: false,
            lable: "无"
          }]
        }, {
          title: "照护对象是否有无精神狂躁行为（如撕被子、手抓大便、拉扯尿不湿）",
          checks: [{
            checked: false,
            lable: "经常"
          }, {
            checked: false,
            lable: "偶尔"
          }, {
            checked: false,
            lable: "没有"
          }]
        }
      ]
    },{
      logo:"ready",
      fun:'submit',
      msg:"评估完成，符合推荐方案，请填写评估者的个人信息",
      btn:"预约试用",
      sexArray:['请选择性别','男','女'],
      formData:{sex:0}
    }]
  },
  onLoad(options) {
    console.log(options)
    that = this;
    that.setData({
      type:options.type
    })
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
      sex:{
        min:1
      },
      age:{
        required: true,
        min:16
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
      sex:{
        min:"请选择性别"
      },
      age:{
        required: '请输入年龄',
        min:"年龄不能小于16岁"
      }
    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  radioChange(e){
    console.log(e);
    let i = that.data.index;
    let index=e.currentTarget.dataset.index;
    let result= that.data.result||{};
    let questions = that.data.questions;
    let val = e.detail.value;
    let title1 = questions[i].title;
    let title2 = questions[i].questions[index].title;
    let lable = questions[i].questions[index].checks[val].lable;    
    if(!result[title1]){
      result[title1] = {};
    }
    result[title1][title2] = {
      lable:lable,
      score:val
    }
        
    that.setData({
      result:result
    });
  },
  inputChange(e){
    console.log(e);
    let name = e.currentTarget.dataset.name;
    let length = that.data.questions.length - 1;
    that.setData({
      ['questions['+length+'].formData.'+name+'']:e.detail.value
    })
  },
  pickerChange(e){
    console.log(e);
    let length = that.data.questions.length - 1;
    that.setData({
      ['questions['+length+'].formData.sex']:e.detail.value
    })

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
  next(){
    let index = that.data.index;
    that.setData({
      index:index+1
    })
  },
  modalBtn(){
    wx.reLaunch({
      url: '/pages/index/home',
    });
  },
  order(){
    console.log(1)
    wx.reLaunch({
      url: '/pages/piss/order',
    })
  },
  submit(){
    let length = that.data.questions.length - 1;
    let data = that.data.questions[length].formData;
    if (!that.WxValidate.checkForm(data)) {
      let error = that.WxValidate.errorList[0]
      that.prompt(error.msg)
      return false;
    }
    that.setData({
      successModal:!that.data.successModal,
      modalMsg:"预约试用成功,\n请查看",
      modalBtn:"好的"
    })
    let result = that.data.result;
    let order = {};
    order.result = result;
    order.info = data;
    order.type = that.data.type;
    order.createTime = util.formatTime(new Date());
    let orders = wx.getStorageSync('orders')||[];    
    orders.unshift(order);
    wx.setStorageSync('orders', orders);
  }
})