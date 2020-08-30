import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    carPanelData: [],
    receiveInfo: [{
      "name": "王某某",
      "phone": "13811111111",
      "areaCode": "010",
      "landLine": "64627856",
      "provinceId": 110000,
      "province": "北京市",
      "cityId": 110100,
      "city": "市辖区",
      "countyId": 110106,
      "county": "海淀区",
      "add": "上地十街辉煌国际西6号楼319室",
      "default": true
    },{
      "name": "李某某",
      "phone": "13811111111",
      "areaCode": "010",
      "landLine": "64627856",
      "provinceId": 110000,
      "province": "北京市",
      "cityId": 110100,
      "city": "市辖区",
      "countyId": 110106,
      "county": "海淀区",
      "add": "上地十街辉煌国际东6号楼350室",
      "default": false
    }],
    maxOff: false,
    carShow: false,
    carTimer: null,
    ball: {
      show: false,
      el: null,
      img: ''
    },
    orderData: []
  },
  getters: {
    totalCount(state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    totalPrice(state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.count * goods.price
      })
      return price
    },
    allChecked(state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if (!goods.checked) {
          allChecked = false
          return ''
        }
      })
      return allChecked
    },
    checkedCount(state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          count += goods.count
          return ''
        }
      })
      return count
    },
    checkedPrice(state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          price += goods.count * goods.price
          return ''
        }
      })
      return price
    },
    checkedGoods(state) {
      let checkedGoods = []
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          checkedGoods.push(goods)
        }
      })
      return checkedGoods
    }
  },
  mutations: {
    addCarPanelData(state, data) {
      let bOff = true
      if (state.ball.show) { return }
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.info.sku_id) {
          goods.count += data.count
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count -= data.count
            state.maxOff = true
            return
          }
          state.carShow = true
          state.ball.show = true
          state.ball.img = data.info.ali_image
          state.ball.el = event.path[0]
        }
      })
      if (bOff) {
        let goodsData = data.info
        Vue.set(goodsData, 'count', data.count)
        Vue.set(goodsData, 'checked', true)
        state.carPanelData.push(goodsData)
        state.carShow = true
        state.ball.show = true
        state.ball.img = data.info.ali_image
        state.ball.el = event.path[0]
      }
    },
    delCarPanelData(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
          return ''
        }
      })
    },
    plusCarPanelData(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count >= goods.limit_num) return
          goods.count++
        }
      })
    },
    subCarPanelData(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count <= 1) return
          goods.count--
        }
      })
    },
    checkGoods(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
         goods.checked = !goods.checked
          return ''
        }
      })
    },
    allCheckGoods(state, allChecked) {
      state.carPanelData.forEach((goods, index) => {
        goods.checked = !allChecked
      })
    },
    delCheckGoods(state) {
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i, 1)
        }
      }
    },
    closePrompt(state) {
      state.maxOff = false
    },
    showCar(state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    hideCar(state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      },500)
    },
    submitReceive(state, data) {
      if (data.default) {
        state.receiveInfo.forEach((receive) => {
          receive.default = false
        })
      }
      state.receiveInfo.push(data)
    },
    submitOrder(state, data) {
      state.orderData.unshift(data)
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i, 1)
        }
      }
    }
  }
})

export default store
