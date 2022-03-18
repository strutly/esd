var that;
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
Page({
  data: {
    sexArray:['请选择性别','男','女'],
    formData:{
      gender:0
    }
  },
  async onLoad(options) {
    that = this;    
    let res = await Api.carePersonalDetail({id:options.id});
    console.log(res);

    that.setData({
      formData:res.data||{gender:0}
    })
    that.initValidate();
  },
  initValidate() {
    const rules = {
      name:{
        required:true
      },
      gender: {
        min: 1
      },
      height: {
        required: true,
        min: 50
      },
      weight: {
        required: true,
        min: 30
      },
      phone: {
        tel: true
      },
      address:{
        required: true
      }      
      
      
    }
    const messages = {

      name:{
        required:"请输入客户姓名"
      },
      gender: {
        min: "请选择客户性别"
      },
      height: {
        required: "请输入客户身高",
        min: "身高不能低于50"
      },
      weight: {
        required: "请输入客户体重",
        min: "体重不能低于30"
      },
      phone: {
        tel: "请输入正确的手机号"
      },
      address:{
        required: "请输入客户家庭地址"
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
  pickerChange(e) {
    that.setData({
      ['formData.gender']: e.detail.value
    })

  },
  async submit(e){
    console.log(e)
    if (!that.WxValidate.checkForm(e.detail.value)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.prompt(error.msg)
      return false;
    }
    let res = {};
    if(e.detail.value.id){
      res = await Api.updateCarePersonal(e.detail.value)
    }else{
      res = await Api.addCarePersonal(e.detail.value);
    }
    if(res.code==0){
      wx.reLaunch({
        url: '/pages/customer/list',
      });
    }
    

  }
})