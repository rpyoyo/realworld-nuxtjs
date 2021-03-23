module.exports = {
  router: {
    linkActiveClass: 'active'
  },
  plugins: [
    '~/plugins/request',
    '~/plugins/filter',
  ],
  server: {
    host: '0.0.0.0',
    port: 8080 // 默认3000
  }
}