<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ login ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register" v-if="login">Need an account?</nuxt-link>
            <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, idx) in messages" :key="idx">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!login">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ login ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/users'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: '',
  components: {},
  props: {
    login: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: '',
      },
      errors: {}
    }
  },
  computed: {

  },
  created () { },
  mounted () { },
  methods: {
    async onSubmit () {
      const submit = this.login ? login : register
      try {
        const { data } = await submit(this.user)

        this.$store.commit('setUser', data.user)
        // 使用 Cookie 存储状态数据实现持久化
        Cookie.set('user', data.user)

        this.$router.push('/')
      } catch (e) {
        this.errors = e.response.data.errors
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>