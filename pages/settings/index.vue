<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <error-messages :errors="errors" />

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="settings.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="settings.username"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="settings.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  v-model="settings.email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="settings.password"
                  required
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser, getUser } from '@/api/users'
import { mapState, mapMutations } from 'vuex'
import ErrorMessages from '@/components/ErrorMessages'

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'Settings',
  middleware: 'authenticated',
  components: {
    ErrorMessages
  },
  props: {},
  data () {
    return {
      settings: {
        "email": '',
        "bio": '',
        "username": '',
        "password": '',
        "image": ''
      },
      errors: {},
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () { },
  mounted () {
    const { email, bio, username, password, image } = this.user
    this.settings = { email, bio, username, password, image }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit () {
      try {
        const { data } = await updateUser(this.settings)
        this.setUser(data.user)
        this.$router.push(`/profile/${data.user.username}`)
      } catch (e) {
        this.errors = e.response.data.errors
      }
    },
    logout () {
      Cookie.set('user', null)
      this.setUser(null)
      this.$router.push('/')
    }
  }
}
</script>
<style lang='less' scoped>
</style>