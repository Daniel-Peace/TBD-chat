const path = require('path')

module.exports = {
  resolve: {
    alias: {
      'timers/promises': path.resolve(__dirname, 'polyfills/timers-promises.js'),
    },
  },
}
