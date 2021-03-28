<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{
                name: 'settings',
              }"
              v-if="user && user.username === profile.username"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="unfollow"
              :disabled="waiting"
              v-else-if="profile.following"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Unfollow {{ profile.username }}
            </button>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="follow"
              :disabled="waiting"
              v-else
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'author',
                  }"
                  exact
                  :to="{
                    name: 'profile-username',
                    params: {
                      username,
                    },
                    query: {
                      tab: 'author',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited',
                  }"
                  exact
                  :to="{
                    name: 'profile-username',
                    params: {
                      username,
                    },
                    query: {
                      tab: 'favorited',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <article-list-item
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />
          <div class="article-preview" v-if="!articles.length">
            No articles are here... yet.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, follow, unfollow } from '@/api/profile'
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
import ArticleListItem from '@/components/ArticleListItem'

export default {
  name: 'Profile',
  middleware: 'authenticated',
  components: {
    ArticleListItem
  },
  props: {
  },
  watchQuery: ['tab'],
  async asyncData ({ params, query }) {
    const { tab = 'author' } = query
    const { username } = params
    const articleParams = {
      [tab]: username
    }

    const [profileData, articlesData] = await Promise.all([
      getProfile(username),
      getArticles(articleParams)
    ])

    const { profile } = profileData.data
    const { articles } = articlesData.data

    return {
      profile,
      tab,
      username,
      articles
    }
  },
  data () {
    return {
      waiting: false,
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () { },
  methods: {
    async follow () {
      this.waiting = true
      await follow(this.profile.username)
      this.waiting = false
      this.profile.following = true
    },
    async unfollow () {
      this.waiting = true
      await unfollow(this.profile.username)
      this.waiting = false
      this.profile.following = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>