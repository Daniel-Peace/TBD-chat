import { defineConfig } from 'cypress'
import { resetTestDatabase } from './backend/src/database_helper.js'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async resetDatabase() {
          await resetTestDatabase()
          return null
        },
      })
      return config
    },
    baseUrl: 'http://localhost:3500',
  },
})
