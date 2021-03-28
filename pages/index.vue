<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'index',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'index',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link active"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'index',
                    query: {
                      tab: 'tag',
                      tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
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
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: Number(page) === p,
                }"
                v-for="p in totalPage"
                :key="p"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'index',
                    query: {
                      tab,
                      tag,
                      page: p,
                    },
                  }"
                  >{{ p }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'index',
                  query: {
                    tab: 'tag',
                    tag,
                  },
                }"
                class="tag-pill tag-default"
                v-for="(tag, idx) in tags"
                :key="idx"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
import ArticleListItem from '@/components/ArticleListItem'

export default {
  name: 'HomePage',
  watchQuery: ['page', 'tag', 'tab'],
  components: {
    ArticleListItem
  },
  props: {},
  async asyncData ({ query, store }) {
    const { page = 1, tag, tab = 'global_feed' } = query
    const limit = 10
    const offset = (page - 1) * limit

    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    const [articleData, tagData] = await Promise.all([
      loadArticles({
        limit,
        offset,
        tag
      }),
      getTags()
    ])

    const { articles, articlesCount } = articleData.data
    const { tags } = tagData.data

    articles.forEach(article => {
      article.favoriteDisabled = false
    })

    return {
      page,
      limit,
      articles,
      articlesCount,
      tags,
      tag,
      tab,
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  created () { },
  mounted () { },
  methods: {

  }
}
</script>
<style lang='less' scoped>
</style>