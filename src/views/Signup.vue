<template>
  <div class="signup-wrapper">
    <div class="input-container">
      <label for="firstName">First Name</label>
      <input class="text-input" type="firstName" name="firstName" v-model="firstName">
    </div>
    <div class="input-container">
      <label for="lastName">Last Name</label>
      <input class="text-input" type="lastName" name="lastName" v-model="lastName">
    </div>
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
    <div class="login">
      <p>Already have an account? <a href="/">login here</a></p>
    </div>
  </div>
</template>

<script>
import { api } from '../services/api'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        hashedPassword: this.password
      }

      const signup = await api('post', 'Signup/ManualSignup', data)

      console.log(signup)

      if (signup.status === 200) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .signup-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    margin-top: 50px;
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

  .login {
    margin-top: 20px;
    text-align: center;
  }

</style>
