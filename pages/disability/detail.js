var that;
Page({

  data: {
    question:[]
  },

  onLoad: function (options) {
    that = this;
    console.log(options)
    let questions = wx.getStorageSync('results');
    let question = [{"title":"肢体痉挛","score":0,"lable":"正常"},{"title":"肢体痉挛","score":3,"lable":"不需要加强试验即可发现有僵直，且关节的活动范围受限。"},{"title":"平衡障碍","score":2,"lable":"需要扶扶手，但容易再跌回椅子上；或是需要尝试一次以上才能扶着扶手站起来，但还是不需要别人帮助。"},{"title":"运动迟缓","score":1,"lable":"不全身性活动和自发性运动存在变慢或减少。"}];//questions[options.index];
    console.log(question)
    question = question.filter(item=>item.score>0);
    that.setData({
      question:question
    })
  }

})