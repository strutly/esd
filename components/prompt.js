Component({
  data: {
    prompt: false,
    promptMsg: ''
  },
  methods: {
    showTips: function (msg) {
      let that = this;
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
    }
  }
})