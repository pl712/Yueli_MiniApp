Page({
  jumpToReserve: function()
  {
    wx.showToast({
      title: '感谢阅读，请预约！',
      icon: 'none',
      duration: 500
    })
    setTimeout(function() {
      wx.navigateTo({
        url: '/pages/reserve/reserve',
      })
    }, 500)
    
  },

  clickImg: function(e){
    wx.previewImage({
      current: 'cloud://dev-cloud-1gwh9jvwac1ba872.6465-dev-cloud-1gwh9jvwac1ba872-1306078339/privacy.jpeg', // 当前显示图片的http链接
      urls: ['cloud://dev-cloud-1gwh9jvwac1ba872.6465-dev-cloud-1gwh9jvwac1ba872-1306078339/privacy.jpeg'] // 需要预览的图片http链接列表
    })
  },

  jumpToShow: function()
  {
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
  },

  onShareAppMessage: function () {},
  onShareTimeline: function () {},
  onAddToFavorites: function () {}


  
})