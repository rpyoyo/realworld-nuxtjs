<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile-username',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile-username',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>

    <template v-if="user.username === article.author.username">
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'editor-slug',
          params: {
            slug: article.slug,
          },
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button
        class="btn btn-outline-danger btn-sm"
        @click="onDelete"
        :disabled="submitting.delete"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following,
        }"
        :disabled="submitting.follow"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? "Unfollow" : "Follow" }}
        {{ article.author.username }}
        <span class="counter"></span>
      </button>
      &nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
        :disabled="submitting.favorite"
        @click="onFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? "Unfavorite" : "Favorite" }} Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { favorite, unfavorite, deleteArticle } from '@/api/article'
import { follow, unfollow } from '@/api/profile'

export default {
  name: 'ArticleMeta',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      submitting: {
        favorite: false,
        follow: false,
        delete: false
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () { },
  mounted () { },
  methods: {
    async onFavorite () {
      if (!this.user) {
        this.$router.push('/login')
      }
      this.submitting.favorite = true
      if (this.article.favorited) {
        await unfavorite(this.article.slug)
        this.article.favorited = false
        this.article.favoritesCount -= 1
      } else {
        await favorite(this.article.slug)
        this.article.favorited = true
        this.article.favoritesCount += 1
      }
      this.submitting.favorite = false
    },
    async onFollow () {
      if (!this.user) {
        this.$router.push('/login')
      }
      this.submitting.follow = true
      if (this.article.author.following) {
        await unfollow(this.article.author.username)
        this.article.author.following = false
      } else {
        await follow(this.article.author.username)
        this.article.author.following = true
      }
      this.submitting.follow = false
    },
    async onDelete () {
      this.submitting.delete = true
      await deleteArticle(this.article.slug)
      this.submitting.delete = true
      this.$router.replace('/')
    }
  }
}
</script>
<style lang='less' scoped>
</style>