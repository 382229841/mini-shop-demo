App({
  onLaunch() {
    const cart = wx.getStorageSync('cart') || []
    this.globalData.cart = cart
    
    // 延迟更新 TabBar 角标，等 TabBar 渲染完成
    const app = this
    setTimeout(() => {
      try { app.updateCartBadge() } catch(e) {}
    }, 500)
  },
  globalData: {
    cart: []
  },
  addToCart(product) {
    const cart = this.globalData.cart
    const exist = cart.find(item => item.id === product.id)
    if (exist) {
      exist.count++
    } else {
      cart.push({ ...product, count: 1, checked: true })
    }
    wx.setStorageSync('cart', cart)
    this.updateCartBadge()
    wx.showToast({ title: '已加入购物车', icon: 'success', duration: 1200 })
  },
  removeFromCart(id) {
    this.globalData.cart = this.globalData.cart.filter(item => item.id !== id)
    wx.setStorageSync('cart', this.globalData.cart)
    this.updateCartBadge()
  },
  updateCartBadge() {
    try {
      const count = this.globalData.cart.reduce((sum, item) => sum + item.count, 0)
      if (count > 0) {
        wx.setTabBarBadge({ index: 1, text: String(count) })
      } else {
        wx.removeTabBarBadge({ index: 1 })
      }
    } catch(e) {
      // TabBar 未就绪，忽略
    }
  }
})
