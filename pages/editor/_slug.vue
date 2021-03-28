<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <error-messages :errors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required
                  :disabled="submitting"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  required
                  :disabled="submitting"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  required
                  :disabled="submitting"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  @keypress.enter="onEnter"
                  :disabled="submitting"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, idx) in article.tagList"
                    :key="idx"
                  >
                    <i class="ion-close-round" @click="removeTag(idx)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle, getArticle } from '@/api/article'
import ErrorMessages from '@/components/ErrorMessages'

export default {
  name: 'Editor',
  middleware: 'authenticated',
  components: {
    ErrorMessages
  },
  props: {},
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      tagInput: '',
      errors: {},
      submitting: false,
    }
  },
  computed: {
    slug () {
      return this.$route.params.slug
    }
  },
  created () { },
  mounted () {
    this.load()
  },
  methods: {
    async load () {
      if (this.slug) {
        const { data } = await getArticle(this.slug)
        this.article = data.article
      }
    },
    onEnter () {
      if (this.article.tagList.indexOf(this.tagInput) === -1) {
        this.article.tagList.push(this.tagInput)
        this.tagInput = ''
      }
    },
    removeTag (idx) {
      this.article.tagList.splice(idx, 1)
    },
    async onSubmit () {
      const submit = this.slug ? updateArticle : createArticle
      try {
        this.submitting = true
        const { data } = await submit({
          slug: this.slug,
          article: this.article
        })
        this.$router.push(`/article/${data.article.slug}`)
      } catch (e) {
        this.errors = e.response.data.errors
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>