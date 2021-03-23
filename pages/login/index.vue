<template>
  <Auth login />
</template>

<script>
import Auth from '@/components/Auth'
export default {
  name: 'Login',
  middleware: 'notAuthenticated',
  components: {
    Auth
  },
  props: {},
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