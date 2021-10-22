// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/scss/_variables.scss";`
      }
    }
  }
}
