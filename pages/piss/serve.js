var that;
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
          title: "照护对象能否使用导尿管",
          checks: [{
            checked: false,
            lable: "使用"
          }, {
            checked: false,
            lable: "不使用"
          },]
        }, {
          title: "照护对象是否需测量尿量",
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
      btn:"保存",
      fun:'submit',
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
    }]
  },
  onLoad(options) {
    console.log(options)
    that = this;
    that.setData({
      orderIndex:options.orderIndex
    })
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
  
  next(){
    let index = that.data.index;
    that.setData({
      index:index+1
    })
  },
  care(){
    let index = that.data.orderIndex;
    wx.navigateTo({
      url: '/pages/piss/care?orderIndex='+index,
    })
  },
  modalBtn(){
    wx.reLaunch({
      url: '/pages/piss/order',
    });
  },
  order(){    
    wx.reLaunch({
      url: '/pages/piss/order',
    })
  },
  submit(){
    let index = that.data.orderIndex;
    let orders = wx.getStorageSync('pissOrder');
    let order = orders[index];
    order.serve = that.data.result;
    wx.setStorageSync('pissOrder', orders);

    that.setData({
      successModal:!that.data.successModal,
      modalMsg:"服务完成~",
      modalBtn:"好的"
    })
  }
})