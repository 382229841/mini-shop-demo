Page({
  data: {
    keyword: '',
    banners: [
      { id:1, title:'新品首发', sub:'全场低至5折', color:'#ff4d4f' },
      { id:2, title:'限时特惠', sub:'满199减50', color:'#722ed1' },
      { id:3, title:'品牌日', sub:'精选大牌直降', color:'#1890ff' }
    ],
    categories: [
      { icon:'📱', name:'手机' },
      { icon:'💻', name:'电脑' },
      { icon:'⌚', name:'手表' },
      { icon:'🎧', name:'耳机' },
      { icon:'🏠', name:'家居' }
    ],
    allGoods: [],
    goods: [],
    loading: false,
    hasMore: false
  },

  onLoad() {
    this.loadGoods()
  },

  // 模拟全部商品数据
  loadGoods() {
    const mock = [
      { id:1,  icon:'📱', name:'旗舰智能手机 Pro Max', desc:'AI芯片 | 2亿像素', price:'4,999', cat:'手机' },
      { id:2,  icon:'💻', name:'轻薄笔记本 Air', desc:'14寸 2.8K屏 | 12代酷睿', price:'5,999', cat:'电脑' },
      { id:3,  icon:'⌚', name:'智能手表 Ultra', desc:'钛合金 | 100m防水', price:'2,999', cat:'手表' },
      { id:4,  icon:'🎧', name:'降噪耳机 Pro', desc:'48dB降噪 | 40h续航', price:'1,299', cat:'耳机' },
      { id:5,  icon:'📦', name:'智能音箱 Home', desc:'AI语音 | 杜比音效', price:'599', cat:'家居' },
      { id:6,  icon:'🎮', name:'游戏主机 Max', desc:'4K 120Hz | 1TB', price:'3,599', cat:'电脑' },
      { id:7,  icon:'📱', name:'折叠屏手机 Fold', desc:'7.8寸折叠 | 骁龙8Gen4', price:'9,999', cat:'手机' },
      { id:8,  icon:'⌚', name:'运动手环 Lite', desc:'14天续航 | 心率监测', price:'299', cat:'手表' },
      { id:9,  icon:'🎧', name:'开放式耳机 Air', desc:'不入耳 | 28h续航', price:'799', cat:'耳机' },
      { id:10, icon:'🏠', name:'扫地机器人 Max', desc:'激光导航 | 3L尘袋', price:'2,499', cat:'家居' },
    ]
    this.setData({ allGoods: mock, goods: mock })
  },

  // 搜索商品
  onSearch(e) {
    const keyword = e.detail.value.trim()
    this.setData({ keyword })
    this.doFilter(keyword)
  },

  // 搜索按钮
  onSearchTap() {
    this.doFilter(this.data.keyword)
  },

  // 过滤逻辑
  doFilter(keyword) {
    if (!keyword) {
      this.setData({ goods: this.data.allGoods })
      return
    }
    const kw = keyword.toLowerCase()
    const goods = this.data.allGoods.filter(g =>
      g.name.toLowerCase().includes(kw) || g.desc.toLowerCase().includes(kw)
    )
    this.setData({ goods })
  },

  // 分类切换
  onCategory(e) {
    const cat = e.currentTarget.dataset.name
    if (cat === '全部') {
      this.setData({ goods: this.data.allGoods })
    } else {
      const goods = this.data.allGoods.filter(g => g.cat === cat)
      this.setData({ goods })
    }
    wx.showToast({ title: cat, icon: 'none', duration: 800 })
  },

  // 商品详情
  onDetail(e) {
    const id = e.currentTarget.dataset.id
    const product = this.data.allGoods.find(g => g.id === id)
    if (product) {
      wx.showModal({
        title: product.name,
        content: `${product.desc}\n价格：¥${product.price}\n分类：${product.cat}`,
        confirmText: '加入购物车',
        success: (res) => {
          if (res.confirm) {
            getApp().addToCart(product)
          }
        }
      })
    }
  },

  // 加入购物车
  onAddCart(e) {
    const id = e.currentTarget.dataset.id
    const product = this.data.allGoods.find(g => g.id === id)
    if (product) {
      getApp().addToCart(product)
    }
  },

  onReachBottom() {
    // 已展示全部
    wx.showToast({ title: '已展示全部商品', icon: 'none', duration: 1000 })
  }
})
