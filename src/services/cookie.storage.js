'use strict'

import Cookie from 'js-cookie'

export default class CookieStorage {
  static setUserId (value) {
    Cookie.set('userId', value)
  }

  static getUserId () {
    return Cookie.get('userId')
  }

  static removeUserId () {
    Cookie.remove('userId')
  }

  static setAuthToken (value) {
    Cookie.set('authToken', value)
  }

  static getAuthToken () {
    return Cookie.get('authToken')
  }

  static setRefreshToken (value) {
    Cookie.set('refreshToken', value)
  }

  static getRefreshToken () {
    return Cookie.get('refreshToken')
  }

  static setCheckoutId (value) {
    Cookie.set('checkoutId', value)
  }

  static getCheckoutId () {
    return Cookie.get('checkoutId')
  }

  static removeCheckoutId () {
    Cookie.remove('checkoutId')
  }
}
