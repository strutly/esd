
var that;
import WxValidate from '../../utils/WxValidate';
import Api from '../../config/api';
Page({
  data: {
    questionList:[],
    result:{} ,
    pageNo:0
  },

  async onLoad(options) {
    console.log(options);

    that = this;
    let res = await Api.scaleQuestions({fid:options.fid});
    let res1 = await Api.questionEvaluationDetail({fid:options.fid,cid:options.cid});
    console.log(res);
    
    that.setData({
      questionList:res.data,
      fid:options.fid,
      cid:options.cid,
      planId:options.planId,
      result:res1.data||{}
    })
    that.showData(0);
  },
  onReady(){
    that.prompt = that.selectComponent("#prompt");
  },
  initValidate(rules,messages) {
    that.WxValidate = new WxValidate(rules, messages);
  },
  prev(){
    let pageNo = that.data.pageNo;
    that.showData(pageNo-1);
  },
  submitForm(e) {
    const params = e.detail.value
    /**
     * 存在返回上一页的情况
     * 所以验证规则在这里进行重新匹配
     **/
    let result = that.data.result;
    let needs = that.data.needs;
    let rules = that.data.rules;
    let messages = that.data.messages;
    Reflect.ownKeys(needs).forEach(function(key){
      needs[key].forEach(n=>{
        let result_val = result[""+key]||{};
        let val = result_val.value;
        if(val==n.val){
          rules[n.groupSort+""+n.sort] = {required: true};
        }else{
          delete rules[n.groupSort+""+n.sort];
          delete result[n.id];
        }
      })
    });
    that.initValidate(rules,messages);
    // 传入表单数据，调用验证方法
    if (!that.WxValidate.checkForm(params)) {
        const error = that.WxValidate.errorList[0];
        console.log(error);
        
        var query = wx.createSelectorQuery();
        query.select("#item"+error.param).boundingClientRect();
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
          
          that.prompt.showTips(error.msg);
        });

        return;
    }
    let pageNo = that.data.pageNo;
    if(pageNo==that.data.questionList.length-1){  
      let fid = that.data.fid;
      let cid = that.data.cid;
      let planId = that.data.planId;
      Api.addQuestionEvaluation(JSON.stringify({
        fid:fid,
        cid:cid,
        planId:planId,
        checkList:Object.values(that.data.result)
      })).then(res=>{
        console.log(res);
        if(res.code==0){
          that.setData({
            modal:true,
            modalMsg:"提交成功,结果为:"+res.data.result,
            modalBtn:"确定",
            result:res.data.result
          })
        }
      })      
    }else{
      that.showData(pageNo+1);
    }
  },
  modalBtn(){
    let fid = that.data.fid;
    let result = that.data.result;
    let planId = that.data.planId;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]; // 上一个页面
    if(prevPage){
      let scales = prevPage.data.scales; // 获取上一页data里的数据
      scales.forEach(scale=>{
        if(scale.id==fid){
          scale.result = result;
          scale.status = true;
          scale.planId = planId;
        }
      });
      prevPage.setData({
        scales:scales
      });
    }
    wx.navigateBack();
  },
  getQuestions(){
    let questionList = that.data.questionList;
    let questions = [];
    questionList.forEach(list=>{
      questions = questions.concat(list.questionList);
    })
    that.setData({
      questions:questions
    })
    return questions;
  },
  getOption(id,vals){
    console.log(vals);
    let questions = that.data.questions|| that.getQuestions();
    console.log(questions);
    let options = [];
    questions.forEach(question=>{
      if(question.id == id){
        question.options.forEach(option=>{
          if(vals.includes(option.value+"")){
            options.push(option);
          }
        })
      }
    })
    return options;
  },
  showData(index){
    let questionbox = that.data.questionList;
    let questions = questionbox[index];
    let rules = {};
    let messages = {};
    let needs = {};
    console.log(questions);
    questions.questionList.forEach(function(q){
      if(q.required){        
        rules[q.groupSort+""+q.sort] = {required: true};
        messages[q.groupSort+""+q.sort] = {required:q.title+"不能为空"}
      }
      if(q.ifNeed){
        let need = q.need.split(",");
        needs[""+need[0]] = needs[""+need[0]]||[];
        needs[""+need[0]].push({id:q.id,val:need[1],groupSort:q.groupSort,sort:q.sort});
      }
    })
    that.initValidate(rules,messages);
    that.setData({
      pageNo:index,
      needs:needs,
      rules:rules,
      messages:messages,
      toIndex:'item'+questions.questionList[0].groupSort+questions.questionList[0].sort,
    });
    wx.setNavigationBarTitle({
      title: questions.name
    })
  },
  getDataSet(e){
    let id = e.target.dataset.id;
    let val = e.detail.value;
    let groupSort = e.target.dataset.groupsort;
    let groupName = e.target.dataset.groupname;
    let sort = e.target.dataset.sort;
    let title = e.target.dataset.title;
    let showtitle = e.target.dataset.showtitle;
    return {
      val:val,
      qid:id,
      groupSort:groupSort,
      title:title,
      groupName:groupName,
      showTitle:showtitle,
      sort:sort
    };
  },

  radionChange(e){
    let set_val = that.getDataSet(e);
    console.log(e);
    set_val.options = that.getOption(set_val.qid,[set_val.val]);
    set_val.type = "radio";
    let set_key = 'result.' + set_val.qid;
    that.setData({
      [set_key]:set_val
    });    
  },
  checkboxChange(e){
    let set_val = that.getDataSet(e);
    console.log(e);
    set_val.options = that.getOption(set_val.qid,set_val.val);
    set_val.type = "checkbox";
    let set_key = 'result.' + set_val.qid;
    that.setData({
      [set_key]:set_val
    });
    that.setData({
      [set_key]:set_val
    }); 
  },
  inputChange(e){
    console.log(e);
    let set_val = that.getDataSet(e);
    set_val.type = "input";
    
    set_val.options = [{
      lable:set_val.title,
      value:0,
      des:e.detail.value
    }]
    let set_key = 'result.' + set_val.qid;
    that.setData({
      [set_key]:set_val
    }); 
  }
})