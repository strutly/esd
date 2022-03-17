var that;
import WxValidate from '../../../utils/WxValidate';
const api = require('../../../config/api');
Page({
  data: {
    customers:[]
  },
  onLoad(options) {
    console.log(options)
    that = this;
    that.setData({
      show:options.show||false
    })

    that.getList("",1);
  },
  async getList(name,pageNo){
    let res = await api.carePersonalPage({name:name,pageNo:pageNo});
    let customers = that.data.customers||[];    
    customers = customers.concat(res.data.content);
    that.setData({
      pageNo:pageNo,
      name:name,
      endline: res.data.last,
      customers:customers      
    });
  },
  search(e){
    console.log(e);
    let val = e.detail.value;
    var reg = /[^\u4e00-\u9fa5]/;
    if (reg.test(val)){
      return;
    }
    that.setData({
      customers:[],
      name:val
    });
    that.getList(val,1)
  },
  onReachBottom(){
    let endline = that.data.endline;
    if(!endline){
      let pageNo = that.data.pageNo + 1;
      let name = that.data.name;
      that.getList(name,pageNo);
    }    
  }


})