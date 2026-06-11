Page({
  data: {
    orderStatus: [
      { icon:'💰', label:'待付款' },
      { icon:'📦', label:'待发货' },
      { icon:'🚚', label:'待收货' },
      { icon:'💬', label:'待评价' },
      { icon:'🔄', label:'售后' }
    ],
    menus: [
      { icon:'📍', title:'收货地址' },
      { icon:'❤️', title:'我的收藏' },
      { icon:'👣', title:'浏览记录' },
      { icon:'🎫', title:'优惠券' },
      { icon:'⭐', title:'我的评价' },
      { icon:'⚙️', title:'设置' }
    ]
  },

  onOrderTap(e) {
    wx.showToast({ title: e.currentTarget.dataset.label, icon: 'none' })
  },

  onAllOrders() {
    wx.showToast({ title: '查看全部订单', icon: 'none' })
  },

  onMenuTap(e) {
    wx.showToast({ title: e.currentTarget.dataset.title + ' (Demo)', icon: 'none' })
  }
})
