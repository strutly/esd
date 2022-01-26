//症状
var that;
Page({

  data: {
    modalMsg:"您选择了两项症状,建议不采用智能大小便清理方案",
    modalBtn:"好的",
    symptoms:['严重压疮','严重痔疮','严重疝气','肛瘘','严重便秘'],
    checked:{
      index:-1,
      checked:false
    }
  },

  onLoad(options) {
    that = this;
  },
  checkSymptom(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let checked = that.data.checked;
    if(checked.checked && checked.index != index){
      return that.modalBtn("您选择了两项症状,建议不采用智能大小便清理方案");
    }
    checked.checked = !checked.checked;
    checked.index = checked.index>-1?-1:index;
    that.setData({
      checked:checked
    })
  },
  modalBtn(msg){
    that.setData({
      modalMsg:msg,
      modal:!that.data.modal
    })
  },
  submit(){
    let checked = that.data.checked;
    if(!checked.checked || checked.index<0){
      return that.modalBtn("请选择症状后再开始评估~");
    }
    wx.navigateTo({
      url: '/pages/piss/form?type='+that.data.checked.index,
    })
  }
})