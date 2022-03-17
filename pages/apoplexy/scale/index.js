var that;
import Api from "../../../config/api";
Page({
  data: {
    scales: [],
    end:''
  },
  async onLoad(options) {
    that = this;
    let cid = options.cid;
    let res = await Api.scaleTypes({ cid: cid });
    let res2 = await Api.orcRecord({cid:cid});
    console.log(res);
    that.setData({
      cid: options.cid,
      scales: res.data,
      end:res2.data?'已完成':''
    })
  },
  async chooseImg(e) {

    let res = await wx.chooseImage({
      count: 1
    })

    console.log(res);
    that.upload(res.tempFilePaths[0]);
  },
  upload(filePath) {
    let cid = that.data.cid;
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: "base64",
      success: function (res) {
        console.log(res);
        let base64 = res.data;
        Api.uploadORCFile({ cid: cid, base64: base64 }).then(res=>{
          console.log(res);
          if(res.code==0){
            that.setData({
              end:"已完成"
            })
          }
        })
      }
    })

  },

})