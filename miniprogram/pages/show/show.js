Page({

  jumptoReserve: function()
  {
    wx.navigateTo({
      url: '/pages/reserve/reserve',
    })
  },

  jumptoHanSheng: function () {
    wx.navigateTo({
      url: '/pages/show-old/show-old',
    })
  },

  jumptoRiXin: function () {
    wx.navigateTo({
      url: '/pages/show-new/show-new',
    })
  },

  onShareAppMessage: function () {},
  onShareTimeline: function () {},
  onAddToFavorites: function () {}

  
})