<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link :to="`/profile/${article.author.username}`"
        ><img :src="article.author.image"
      /></nuxt-link>
      <div class="info">
        <nuxt-link :to="`/profile/${article.author.username}`" class="author">{{
          article.author.username
        }}</nuxt-link>
        <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{
          active: article.favorited,
        }"
        :disabled="article.favoriteDisabled"
        @click="onFavorite(article)"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="(tag, idx) in article.tagList"
          :key="idx"
        >
          {{ tag }}
        </li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
import { favorite, unfavorite } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleListItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () { },
  mounted () { },
  methods: {
    async onFavorite (article) {
      if (!this.user) {
        this.$router.push('/login')
      }
      article.favoriteDisabled = true
      if (article.favorited) {
        await unfavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await favorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>