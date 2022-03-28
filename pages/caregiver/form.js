
var that;
import WxValidate from '../../utils/WxValidate';
import Api from '../../config/api';
Page({
  data: {
    sexArray:['请选择性别','男','女'],
    educationArray:['请选择学历','中专','大专','本科','硕士','研究生','博士','其他'],
    workplaceArray:['请选择工作地点','北京' ,'郑州', '成都', '广州', '上海'],
    formData:{
      gender:0,
      education:0,
      expectAddress:0
    },
    show:false
  },
  onLoad: function (options) {
    that = this;
    that.setData({
      formData:wx.getStorageSync('data')||{
        gender:0,
        education:0,
        expectAddress:0
      }
    })
    that.initValidate();
  },
  onReady(){
    that.prompt = that.selectComponent("#prompt");
  },
  pickerChange(e){
    console.log(e);
    let type = e.currentTarget.dataset.type;
    that.setData({
      [type]:e.detail.value
    })
  },
  initValidate() {

    const rules = {
      name: {
        required: true,
        minlength:2
      },
      gender:{
        min:1
      },
      idNum:{
        required: true,
        idcard:true
      },
      education:{
        min:1
      },
      phone:{
        required:true,
        tel:true
      },
      residence:{
        required: true,
        minlength:2
      },
      photo:{
        required: true
      },
      agree:{
        eq: "true"
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength:'请输入正确的姓名'
      },
      gender:{
        min:"请选择性别"
      },
      idNum:{
        required: '请输入您的身份证号码',
        min:"请选择性别"
      },
      education:{
        min:"请选择学历"
      },
      phone:{
        required:'请填写手机号',
        tel:'请填写正确的手机号'
      },
      residence:{
        required: '请填写您的现居住地',
        minlength:'请输入正确的现居住地'
      },
      photo:{
        required: '请上传头像'
      },
      agree:{
        eq: "请同意隐私协议"
      }
    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  async formCheck(e){    
    let params = e.detail.value;
    wx.setStorageSync('data', params);
    console.log(params)
    if (!that.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0]
      that.prompt.showTips(error.msg)
      return false
    }
    params.trainClass = {id:3};
    params.trainOrg = {id:1};
    let res = await Api.addStudent(JSON.stringify(params));
    if(res.code==0){
      wx.showToast({
        title: '提交成功',
      })
    }
  },
  async addPic(){
    let res = await wx.chooseImage({
      count: 1,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera']
    });
    console.log(res)
    let data = await Api.uploadFile(res.tempFilePaths[0]);
    console.log(data)
    if(data.code==0){
      that.setData({
        ['formData.photo']:Api.domain+data.data.src
      })
    }
  },
  checkboxChange(e){
    let val = e.detail.value;    
    that.setData({
      agree:val.includes("agree")
    })
  },
  mask(){
    that.setData({
      show:!that.data.show
    });
  },
  readEnd(){
    that.mask();
    that.setData({
      agree:true
    })
  }
})