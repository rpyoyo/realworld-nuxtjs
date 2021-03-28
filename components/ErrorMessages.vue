<template>
  <ul class="error-messages">
    <template v-for="(messages, field) in errors">
      <li v-for="(message, idx) in messages" :key="idx">
        {{ field }} {{ message }}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    errors: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style lang='less' scoped>
</style>