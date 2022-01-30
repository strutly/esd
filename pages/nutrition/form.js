var that;
import WxValidate from '../../utils/WxValidate.js';
const app = getApp();
Page({
  data: {
    index: 0,
    aloneScore:0,
    gatherScore:0,
    questions: [{
      logo: "body",
      fun: 'next',
      msg: "请输入评估者身体状况",
      btn: "开始评估",
      sexArray: ['请选择性别', '男', '女'],
      formData: { sex: 0 }
    },{
      title: "MNA-SF量表",
      logo: "nutrition",
      btn: "完成评估",
      fun: 'submit',
      questions: [
        {
          title: "过去三个月内有没有因为食欲不振、消化问题、咀嚼或吞咽困难而减少食量?",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "食量严重减少",
            score: 0
          }, {
            checked: false,
            lable: "食量中度减少",
            score: 1
          }, {
            checked: false,
            lable: "食量没有改变",
            score: 2
          }]
        }, {
          title: "过去三个月内体重下降的情况",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "体重下降大于3公斤",
            score: 0
          }, {
            checked: false,
            lable: "不知道",
            score: 1
          }, {
            checked: false,
            lable: "体重下降1-3公斤",
            score: 2
          }, {
            checked: false,
            lable: "体重没有下降",
            score: 3
          }]
        }, {
          title: "活动能力",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "需要长期卧床或坐轮椅",
            score: 0
          }, {
            checked: false,
            lable: "可以下床或离开轮椅",
            score: 1
          }, {
            checked: false,
            lable: "可以外出",
            score: 2
          }]
        }, {
          title: "过去三个月内有没有受到心理创伤或患者急性疾病",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "有",
            score: 0
          }, {
            checked: false,
            lable: "无",
            score: 2
          }]
        }, {
          title: "可以独立生活(非居住于养老院或医院)",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "是",
            score: 1
          }, {
            checked: false,
            lable: "否",
            score: 0
          }]
        }, {
          title: "每天需服用三种以上的处方药物",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "是",
            score: 0
          }, {
            checked: false,
            lable: "否",
            score: 1
          }]
        }, {
          title: "是否有褥疮或皮肤溃疡",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "是",
            score: 0
          }, {
            checked: false,
            lable: "否",
            score: 1
          }]
        }, {
          title: "每天可以吃几次完整的餐食",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "1餐",
            score: 0
          }, {
            checked: false,
            lable: "2餐",
            score: 1
          }, {
            checked: false,
            lable: "3餐",
            score: 2
          }]
        }, {
          title: "蛋白质摄入量",
          type: 'gather',
          questions: [{
            title: '每天至少进食一份乳制品(牛奶或其他乳制品)',
            checks: [{
              checked: false,
              lable: "是",
              score: 1
            }, {
              checked: false,
              lable: "否",
              score: 0
            }]
          }, {
            title: '每周进食两份以上豆类或蛋类',
            checks: [{
              checked: false,
              lable: "是",
              score: 1
            }, {
              checked: false,
              lable: "否",
              score: 0
            }]
          }, {
            title: '每天均吃些肉、鱼、鸡鸭类',
            checks: [{
              checked: false,
              lable: "是",
              score: 1
            }, {
              checked: false,
              lable: "否",
              score: 0
            }]
          }]
        }, {
          title: "每天有进食两份或两份以上的蔬菜或水果?",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "否",
            score: 0
          }, {
            checked: false,
            lable: "是",
            score: 1
          }]
        }, {
          title: "每天喝多少流质(水、果汁、咖啡、茶、牛奶等)?",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "少于3杯",
            score: 0
          }, {
            checked: false,
            lable: "3 至 5杯",
            score: 0.5
          }, {
            checked: false,
            lable: "多于5杯",
            score: 1
          }]
        }, {
          title: "进食模式",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "需辅助才能进食",
            score: 0
          }, {
            checked: false,
            lable: "能自行进食但稍有困难",
            score: 1
          }, {
            checked: false,
            lable: "能自行进食",
            score: 2
          }]
        }, {
          title: "自我评估营养状况",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "觉得自己营养状况非常不好",
            score: 0
          }, {
            checked: false,
            lable: "不太清楚或营养状况不太好",
            score: 1
          }, {
            checked: false,
            lable: "觉得自己营养状况一切正常",
            score: 2
          }]
        }, {
          title: "与其他同龄的人比较,病人如何评价自己的健康状况?",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "不如同年龄的人",
            score: 0
          }, {
            checked: false,
            lable: "不知道",
            score: 0.5
          }, {
            checked: false,
            lable: "和同年龄的人差不多",
            score: 1
          }, {
            checked: false,
            lable: "比同年龄的人好",
            score: 2
          }]
        }, {
          title: "臂中围(MAC)(公分,cm)",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "MAC < 21",
            score: 0
          }, {
            checked: false,
            lable: "MAC 21~21.9",
            score: 0.5
          }, {
            checked: false,
            lable: "MAC ≥ 22",
            score: 1
          }]
        }, {
          title: "小腿围(CC)(公分,cm)",
          type: 'alone',
          checks: [{
            checked: false,
            lable: "CC < 31",
            score: 0
          }, {
            checked: false,
            lable: " CC ≥ 31",
            score: 1
          }]
        }
      ]
    }],
    checkIndex:["0","1","2","3","4","5","6","7","8_0","8_1","8_2","9","10","11","12","13","14","15"],
    checks:{
      "0":-1,
      "1":-1,
      "2":-1,
      "3":-1,
      "4":-1,
      "5":-1,
      "6":-1,
      "7":-1,
      "8_0":-1,
      "8_1":-1,
      "8_2":-1,
      "9":-1,
      "10":-1,
      "11":-1,
      "12":-1,
      "13":-1,
      "14":-1,
      "15":-1
    }    
  },
  onLoad(options) {
    console.log(options)
    that = this;
    that.setData({
      type: options.type
    });
    that.initValidate();
  },
  initValidate() {
    const rules = {
      age: {
        required: true,
        min: 16,
        max:120
      },      
      sex: {
        min: 1
      },
      height: {
        required: true,
        min: 50
      },
      weight: {
        required: true,
        min: 30
      }
    }
    const messages = {
      age: {
        required: '请填写年龄',
        min: '年龄不足16周岁~',
        max:'年龄太大了,谢谢使用~'
      },
      sex: {
        min: "请选择性别"
      },
      height: {
        required: "请填写身高",
        min: '身高不足50CM'
      },
      weight: {
        required: "请填写体重",
        min: '体重不足30KG'
      }
    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  radioChange(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;    
    let val = e.detail.value;  
    let checks = that.data.checks;
    checks[index] = val;
    that.setData({
      checks:checks
    });
  },
  inputChange(e) {
    console.log(e);
    let name = e.currentTarget.dataset.name;
    let length = that.data.questions.length - 1;
    that.setData({
      ['questions[' + length + '].formData.' + name + '']: e.detail.value
    })
  },
  pickerChange(e) {
    console.log(e);
    let index = that.data.index;
    that.setData({
      ['questions[' + index + '].formData.sex']: e.detail.value
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
  checking(){
    let flag = true;
    let checks = that.data.checks;
    let checkIndex = that.data.checkIndex;
    for(let i in checkIndex){
      let key = checkIndex[i];
      let id = '#title_'+key;
      if(checks[key]==-1){        
        var query = wx.createSelectorQuery();
        query.select(id).boundingClientRect();
        query.selectViewport().scrollOffset();        
        query.exec((res) => {
          console.log(res);
          //已经滚动的高度
          let scrollTop = res[1].scrollTop;
          //目标距离顶部的高度
          let top = res[0].top;            
          wx.pageScrollTo({
            scrollTop:top + scrollTop - 28
          });
          let msg = res[0].dataset.title;
          that.prompt("请选择["+msg+"]的答案!");
        });
        flag = false;
        break;
      }
    }
    return flag;
  },
  submitForm(e) {
    console.log(e);
    let param = e.detail.value;
    if (!that.WxValidate.checkForm(param)) {
      const error = that.WxValidate.errorList[0];
      return that.prompt(error.msg)
    }
    that.setData({
      info:param
    })
    that.next();    
  },
  modalBtn() {
    wx.reLaunch({
      url: '/pages/index/home',
    });
  },
  order() {    
    wx.reLaunch({
      url: '/pages/nutrition/order',
    })
  },
  submit() {
    if(!that.checking()) return;
    let info = that.data.info;
    let result = that.data.checks;
    let score = 0;
    let aloneScore = 0;
    let gatherResult = [];
    Object.keys(result).forEach(key=>{
      console.log(key);
      console.log(key.includes("8"))
      if(key.includes("8")){
        gatherResult.push(result[key]);
      }else{
        aloneScore+=parseFloat(result[key]);
      }
    });
    let length = gatherResult.filter(item=>{
      return item>0;
    }).length;
    let sizeScore = {0:0,1:0,2:0.5,3:1};

    score = parseFloat(aloneScore) + parseFloat(sizeScore[length]);
    let order = {
      info:info,
      result:result,
      score:score
    };
    app.globalData.nutritionOrder = order;
    wx.reLaunch({
      url: '/pages/nutrition/result',
    })

  }
})