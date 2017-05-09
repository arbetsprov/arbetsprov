const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    apiUrl: 'http://localhost:5000/api',
  },
  test: {},
  development: {},
  production: {
    apiUrl: 'http://localhost:5000/api',
  },
}

module.exports = merge(config.all, config[config.all.env])



