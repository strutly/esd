const app = getApp();
const api = require('../../config/api');
var that;
Page({
  data: {
    roleName:['浏览用户','培训学员','考核学员','中级(四级)'],
    role:0
  },
  async onLoad() {
    that = this;
    let res = await api.allTrainClass({});
    console.log(res);
    that.setData({
      trainClass:res.data
    })
  }
})
