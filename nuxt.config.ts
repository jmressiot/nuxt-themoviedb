
const config = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'My movies',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
** Customize the progress bar color
*/
  loading: { color: '#3B8070' },
  /*
** Build configuration
*/
  build: {
  /*
  ** Run ESLint on save
  */
    extend(config, { isDev, isClient }) {
      if (config && config.module && isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  plugins: ['~plugins/vuetify.js'],
  modules: []
}

export default config
