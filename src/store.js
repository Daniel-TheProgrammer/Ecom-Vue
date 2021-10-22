import Vue from 'vue'
import Vuex from 'vuex'
import shopify from '@/services/shopify'
import CookieStorage from '@/services/cookie.storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collections: [],
    basket: [],
    checkout: null,
    loggedIn: false,
    user: null
  },
  mutations: {
    updateCollections (state, payload) {
      state.collections = payload
    },
    addToBasket (state, payload) {
      state.basket.push(payload)
    },
    removeFromBasket (state, payload) {
      state.basket = state.basket.filter(item => item.id !== payload.id)
    },
    emptyBasket (state) {
      state.basket = []
    },
    updateCheckout (state, payload) {
      state.checkout = payload
    },
    setLoggedIn (state, payload) {
      state.loggedIn = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async addItemToBasket ({ commit }, payload) {
      const checkoutId = payload.checkoutId
      const id = payload.itemId

      const lineItemsToAdd = [{
        variantId: id,
        quantity: +payload.quantity
      }]

      try {
        const updatedCheckout = await shopify.checkout.addLineItems(checkoutId, lineItemsToAdd)
        commit('updateCheckout', updatedCheckout)
      } catch (err) {
        console.log(err)
      }
    },
    async removeItemFromBasket ({ commit }, payload) {
      const checkoutId = payload.checkoutId
      const id = payload.itemId

      const lineItemIdsToRemove = [
        id
      ]

      try {
        const updatedCheckout = await shopify.checkout.removeLineItems(checkoutId, lineItemIdsToRemove)
        commit('updateCheckout', updatedCheckout)
      } catch (err) {
        console.log(err)
      }
    },
    async updateItemInBasket ({ commit, state }, payload) {
      const checkoutId = payload.checkoutId
      const id = payload.itemId

      const item = state.checkout.lineItems.find(x => x.id === id)

      let lineItemsToUpdate

      if (payload.state === 'dec' && item) {
        lineItemsToUpdate = {
          id,
          quantity: item.quantity - 1
        }
      }

      if (payload.state === 'inc' && item) {
        lineItemsToUpdate = {
          id,
          quantity: item.quantity + 1
        }
      }

      try {
        const updatedCheckout = await shopify.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
        commit('updateCheckout', updatedCheckout)
      } catch (err) {
        console.log(err)
      }
    },
    async createCheckout ({ commit }) {
      try {
        const checkout = await shopify.checkout.create()
        commit('updateCheckout', checkout)
        CookieStorage.setCheckoutId(checkout.id)
      } catch (error) {
        console.log(error)
      }
    },
    async getCheckout ({ commit }, payload) {
      try {
        const checkout = await shopify.checkout.fetch(payload.id)
        commit('updateCheckout', checkout)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    collections: state => {
      return state.collections
    },
    basket: state => {
      return state.basket
    },
    checkout: state => {
      return state.checkout
    },
    loggedIn: state => {
      return state.loggedIn
    },
    user: state => state.user
  }
})
