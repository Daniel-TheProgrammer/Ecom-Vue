<template>
  <div class="login-wrapper">
    <div class="input-container">
      <label for="email">Email</label>
      <input class="text-input" type="email" name="email" v-model="email">
    </div>
    <div class="input-container">
      <label for="password">Password</label>
      <input class="text-input" type="password" name="password" v-model="password">
    </div>
    <div class="button-container">
      <input class="primary" type="submit" value="Submit" @click="submit">
    </div>
    <div class="sign-up">
      <p>No Account? <a href="/signup">signup here</a></p>
    </div>
  </div>
</template>

<script>
import { api } from '@/services/api'
import CookieStorage from '@/services/cookie.storage.js'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      const data = {
        email: this.email,
        password: this.password
      }

      try {
        const login = await api('post', 'Login/ManualLogin', data)

        if (!login) {
          return
        }

        CookieStorage.setUserId(login.data.user._id)
        CookieStorage.setAuthToken(login.data.authToken)
        CookieStorage.setRefreshToken(login.data.refreshToken)

        this.$store.commit('setLoggedIn', true)
        this.$store.commit('setUser', login.data.user)
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    margin-top: 100px;
  }

  .input-container {
    margin: 10px;
    width: 320px;

    .text-input {
      width: 100%;
      height: 50px;
      font-size: 20px;
      padding: 0 10px;
    }
  }

  .button-container {
    margin: 20px auto;
  }

  .sign-up {
    margin-top: 20px;
    text-align: center;
  }
</style>
