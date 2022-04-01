var that;
import Api from '../../config/api';
Page({

  data: {
    types:{
      apoplexy:"/pages/scale/index",
      piss:"/pages/piss/form2"
    }
  },

  onLoad(options) {
    that = this;
    that.setData({
      type:options.type||'apoplexy'
    })
    that.getList("",1);
  },
  async getList(name,pageNum){
    let res = await Api.carePersonalPage({name:name,pageNum:pageNum});
    let customers = that.data.customers||[];    
    customers = customers.concat(res.data.content);
    that.setData({
      pageNum:pageNum,
      name:name,
      endline: res.data.last,
      customers:customers      
    });
  },
  search(e){
    console.log(e);
    let val = e.detail.value;
    let reg = /^[a-zA-Z]+$/;
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
      let pageNum = that.data.pageNum + 1;
      let name = that.data.name;
      that.getList(name,pageNum);
    }    
  }
})