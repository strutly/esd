var that;
const app = getApp();
import Api from "../../config/api";
Page({
  data: {

  },
  async onLoad(options) {
    that = this;
    if(!app.globalData.ifAuth){      
      let res = await Api.login();
      console.log(res);
      if(res.code==0){
        wx.setStorageSync('token', res.data);
        that.setData({
          ifAuth:true
        })
        app.globalData.ifAuth = true;
      }else{
        that.prompt(res.msg);
      }
    }else{
      that.setData({
        ifAuth:true
      })
    }
  },
  toHref(e){
    let ifAuth = app.globalData.ifAuth;
    console.log(e);
    let url = e.currentTarget.dataset.url;
    if(ifAuth){
      wx.navigateTo({
        url: url,
      })
    }else{
      that.authModal();
    }
  },
  authModal(){
    that.setData({
      authModal:!that.data.authModal,
    })
  },
  async getPhoneNumber(e){
    console.log(e);
    if(e.detail.errMsg==="getPhoneNumber:ok"){
      let code = await Api.getCode();      
      let res = await Api.phone({
        encryptedData:e.detail.encryptedData,
        code:code,
        iv:e.detail.iv
      })
      console.log(res);
      if(res.code==0){
        wx.setStorageSync('token', res.data);
        app.globalData.ifAuth = true;
        that.setData({
          ifAuth:true,
          authModal:false
        });        
      }else{
        that.prompt(res.msg);
      }
    }else{
      that.prompt("您已拒绝授权获取手机号~");
    }
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
})