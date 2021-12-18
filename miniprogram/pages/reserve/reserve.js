Page({
  globalData:{
    value: "",
    length: 0,
    num: 0
  },

  data:{
    dialogShow: true,
    buttons: [{text: '不同意'}, {text: '已阅，同意'}]
  },

  tapHyperLink:function(e){
    wx.redirectTo({
      url: '/pages/privacy/privacy'
    })
  },

  tapDialogButton:function(e) {
    
    if (e.detail.index == 1) {
      let that = this;
      wx.showToast({
        title: '感谢阅读，请预约！',
        icon: 'none',
        duration: 500
      })
      setTimeout(function() {
        that.setData({
          dialogShow: false
        })
      }, 500) 

    }else {
      wx.showToast({
        title: '2秒后跳转至展览信息',
        icon: 'none',
        duration: 2000
      })
      setTimeout(function() {
        wx.switchTab({
          url: '/pages/show/show'
        })
      }, 2000)
      
    }
  },

  // data:{
  //   nName: "peter",
  // },

  // onLoad() {
  //   if (wx.getUserProfile) {
  //     this.setData({
  //       canIUseGetUserProfile: true
  //     })
  //   }
  // },

  // getUserProfile(e) {
  //   wx.getUserProfile({
  //     desc: "abc",
  //     success: (res) => {
  //       console.log(res);
  //       this.setData({
  //         nName: res.userInfo.nickName
  //       })
  //       const db = wx.cloud.database()
  //       db.collection('user').where({
  //         name: res.userInfo.nickName
  //       })
  //       .get({
  //         success: function(res2) {
  //           if(res2.data.length == 0) {
  //             db.collection('user').add({
  //               data: {name: res.userInfo.nickName},
  //             })
  //           }
  //           else{
  //             db.collection('user').where({
  //               name: res.userInfo.nickName
  //             })
  //             .update({data: {name: res.userInfo.nickName}})
  //           }
  //           wx.showToast({
  //             title: '谢谢！',
  //             icon: 'none',
  //             duration: 2000
  //           })
  //         }
  //       })
  //     }
  //   })
  // },

  onShareAppMessage: function () {},
  onShareTimeline: function () {},
  onAddToFavorites: function () {},

  formSubmit(e){
    this.globalData.value = e.detail.value.userInput;
    this.globalData.length = e.detail.value.userInput.length;
  },

  getPhoneNumber(e){
    var x = e.target.id;
    let that = this;

    var len = that.globalData.length;
    var text = that.globalData.value;
    var date = new Date();
    var usrDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    console.log("length is " + len)
    console.log("text is "+ text)
    console.log("date is " + usrDate)

    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showToast({
        title: '需要您的手机号！',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    wx.showLoading({
      title: '手机号码获取中...',
    })

    wx.cloud.callFunction({
      name: 'getToken',
      data: {
        action:'getcellphone',
        id:wx.cloud.CloudID(e.detail.cloudID), 
      },

      success: res => {
        const db = wx.cloud.database()
        db.collection('user').where({
          phone: res.result
        })
        .get({
          success: function(res2) {
            if(res2.data.length == 0) {
              if(len > 3){
                db.collection('user').add({
                  data: {phone: res.result, reg: true, text: text, time: usrDate},
                })
                // db.collection('user').where({
                //   name: nName
                // })
                // .update({data: {phone: res.result, reg: true, text: text}})

                wx.navigateToMiniProgram({ 
                  appId: 'wxe8a015203d67e81c',
                  path: '/pages/event-detail/event-detail?id=1607881223800&channel_code=4328363122557'
                })
              }else{
                wx.showToast({
                  title: '要多于四个字哦！',
                  icon: 'none',
                  duration: 2000,
                })
                return
              }  
            }else{
              if(len > 3){
                db.collection('user').where({
                  phone: res.result
                })
                .update({data: {text: text, time: usrDate}})
                wx.navigateToMiniProgram({ 
                  appId: 'wxe8a015203d67e81c', //活动行appid
                  path: '/pages/event-detail/event-detail?id=1607881223800&channel_code=4328363122557'
                })
              }else{
                wx.showToast({
                  title: '要多于四个字哦！',
                  icon: 'none',
                  duration: 2000,
                })
                return
              }
            }

            wx.hideLoading()
            if (res.result == null) {
              wx.showToast({
                title: 'res.result is null',
                icon: 'none',
                duration: 2000
              })
              return false;
            }
          },
          fail: err => {
            console.error(err);
            wx.hideLoading()
            wx.showToast({
              title: '获取失败,请重试！',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
    })
  },

})