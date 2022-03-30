var that;
const app = getApp();
import Api from "../../config/api";
Page({
  data: {
    userInfo: {
      nickName: "授权获取",
      avatarUrl: "/images/headimg.png"
    }
  },
  async onLoad(options) {
    that = this;
    if (!app.globalData.ifAuth) {
      let res = await Api.login();
      console.log(res);
      if (res.code == 0) {
        wx.setStorageSync('token', res.data);
        let userInfo = wx.getStorageSync('userInfo') || {
          nickName: "授权获取",
          avatarUrl: "/images/headimg.png"
        }
        that.setData({
          userInfo: userInfo,
          ifAuth: true
        })
        app.globalData.ifAuth = true;
      } else {
        that.prompt.showTips(res.msg);
      }
    } else {
      that.setData({
        ifAuth: true
      })
    }
  },
  toHref(e) {
    let ifAuth = app.globalData.ifAuth;
    console.log(e);
    let url = e.currentTarget.dataset.url;
    if (ifAuth) {
      wx.navigateTo({
        url: url,
      })
    } else {
      that.authModal();
    }
  },
  authModal() {
    that.setData({
      authModal: !that.data.authModal,
    })
  },
  async getPhoneNumber(e) {
    console.log(e);
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      let code = await Api.getCode();
      let res = await Api.phone({
        encryptedData: e.detail.encryptedData,
        code: code,
        iv: e.detail.iv
      })
      console.log(res);
      if (res.code == 0) {
        wx.setStorageSync('token', res.data);
        app.globalData.ifAuth = true;
        that.setData({
          ifAuth: true,
          authModal: false
        });
      } else {
        that.prompt.showTips(res.msg);
      }
    } else {
      that.prompt.showTips("您已拒绝授权获取手机号~");
    }
  },
  onReady() {
    that.prompt = that.selectComponent("#prompt");
  },
  async getUserProfile(e) {
    console.log(e);
    try {
      let res = await wx.getUserProfile({
        desc: '用于完善会员资料'
      });
      let code = await Api.getCode();
      let auth = await Api.auth({
        code: code,
        encryptedData: res.encryptedData,
        iv: res.iv,
        signature: res.signature,
        rawData: res.rawData
      })
      console.log(res);
      console.log(auth);
      if (auth.code == 0) {
        wx.setStorageSync('userInfo', auth.data);
        that.setData({
          userInfo: auth.data
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
})