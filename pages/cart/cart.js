Page({
  data: {
    cart: [],
    totalPrice: '0',
    totalCount: 0,
    allChecked: false
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
    const app = getApp()
    const cart = app.globalData.cart
    const checked = cart.filter(item => item.checked)
    const totalPrice = checked.reduce((sum, item) => sum + parseFloat(item.price) * item.count, 0)
    const totalCount = checked.reduce((sum, item) => sum + item.count, 0)
    const allChecked = cart.length > 0 && cart.every(item => item.checked)

    this.setData({
      cart,
      totalPrice: totalPrice.toFixed(2),
      totalCount,
      allChecked
    })
  },

  // 切换选中
  toggleCheck(e) {
    const id = e.currentTarget.dataset.id
    const cart = getApp().globalData.cart
    const item = cart.find(i => i.id === id)
    if (item) {
      item.checked = !item.checked
      wx.setStorageSync('cart', cart)
      this.loadCart()
    }
  },

  // 全选/取消
  toggleAll() {
    const app = getApp()
    const newChecked = !this.data.allChecked
    app.globalData.cart.forEach(item => { item.checked = newChecked })
    wx.setStorageSync('cart', app.globalData.cart)
    this.loadCart()
  },

  // 数量增减
  changeQty(e) {
    const { id, delta } = e.currentTarget.dataset
    const cart = getApp().globalData.cart
    const item = cart.find(i => i.id === id)
    if (!item) return
    item.count += delta
    if (item.count <= 0) {
      getApp().removeFromCart(id)
      this.loadCart()
      return
    }
    wx.setStorageSync('cart', cart)
    getApp().updateCartBadge()
    this.loadCart()
  },

  // 结算
  onPay() {
    const totalCount = this.data.totalCount
    if (totalCount === 0) {
      wx.showToast({ title: '请先选择商品', icon: 'none' })
      return
    }
    wx.showModal({
      title: '确认订单',
      content: `共 ${totalCount} 件商品，合计 ¥${this.data.totalPrice}`,
      confirmText: '立即支付',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '支付成功！', icon: 'success' })
          getApp().globalData.cart = []
          wx.setStorageSync('cart', [])
          getApp().updateCartBadge()
          this.loadCart()
        }
      }
    })
  }
})
