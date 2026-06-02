Page({
  data: {
    keyword: '',
    banners: [
      { title:'新品首发', sub:'全场低至5折', color:'#ff4d4f' },
      { title:'限时特惠', sub:'满199减50', color:'#722ed1' },
      { title:'品牌日', sub:'精选大牌直降', color:'#1890ff' }
    ],
    categories: [
      { icon:'📱', name:'手机' },
      { icon:'💻', name:'电脑' },
      { icon:'⌚', name:'手表' },
      { icon:'🎧', name:'耳机' },
      { icon:'🏠', name:'家居' }
    ],
    goods: [],
    loading: false,
    hasMore: true
  },

  onLoad() {
    this.loadGoods()
  },

  loadGoods() {
    // 模拟数据
    const mock = [
      { id:1, icon:'📱', name:'旗舰智能手机 Pro Max', desc:'AI芯片 | 2亿像素', price:'4,999' },
      { id:2, icon:'💻', name:'轻薄笔记本 Air', desc:'14寸 2.8K屏 | 12代酷睿', price:'5,999' },
      { id:3, icon:'⌚', name:'智能手表 Ultra', desc:'钛合金 | 100m防水', price:'2,999' },
      { id:4, icon:'🎧', name:'降噪耳机 Pro', desc:'48dB降噪 | 40h续航', price:'1,299' },
      { id:5, icon:'📦', name:'智能音箱 Home', desc:'AI语音 | 杜比音效', price:'599' },
      { id:6, icon:'🎮', name:'游戏主机 Max', desc:'4K 120Hz | 1TB', price:'3,599' },
    ]
    this.setData({
      goods: this.data.goods.concat(mock),
      loading: true
    })
    setTimeout(() => {
      this.setData({ loading: false, hasMore: false })
    }, 800)
  },

  onSearch(e) {
    this.setData({ keyword: e.detail.value })
  },

  onCategory(e) {
    wx.showToast({ title: '切换到：' + e.currentTarget.dataset.name, icon: 'none' })
  },

  onDetail(e) {
    wx.showToast({ title: '查看商品 #' + e.currentTarget.dataset.id, icon: 'none' })
  },

  onAddCart(e) {
    const app = getApp()
    app.globalData.cartCount++
    wx.showToast({ title: '已加入购物车', icon: 'success' })
    wx.setTabBarBadge({ index: 0, text: String(app.globalData.cartCount) })
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadGoods()
    }
  }
})
