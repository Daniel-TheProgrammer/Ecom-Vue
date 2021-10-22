import axios from 'axios'
import CookieStorage from '@/services/cookie.storage'
import Vue from '@/main'

const host = 'http://localhost:3001'

export async function api (method, endpoint, data = {}) {
  try {
    const result = await axios({
      method,
      url: `${host}/${endpoint}`,
      data,
      headers: {
        'Authorization': CookieStorage.getAuthToken()
      }
    })

    return result
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        const refreshToken = CookieStorage.getRefreshToken()
        const userId = CookieStorage.getUserId()

        if (!refreshToken || !userId) {
          Vue.$router.push({ name: 'login' })
          return false
        }

        const login = await fetchNewToken(refreshToken, userId)

        if (!login) {
          return false
        }

        try {
          const result = await api(method, endpoint, data)
          return result
        } catch (error) {
          return 'no good mate'
        }
      } else {
        return error.response.data
      }
    }
    return error
  }
}

async function fetchNewToken (rt, id) {
  console.info('Trying refresh token')
  try {
    const login = await axios({
      method: 'post',
      url: `${host}/Login/ManualLogin`,
      data: {
        user: id,
        refreshToken: rt
      }
    })

    CookieStorage.setAuthToken(login.data.authToken)
    CookieStorage.setRefreshToken(login.data.refreshToken)

    return login
  } catch (error) {
    console.info('Refresh token failed. Please login again')
    return false
  }
}
