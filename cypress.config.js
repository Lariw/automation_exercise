const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },

  viewportWidth: 1440,
  viewportHeight: 768,
  defaultCommandTimeout: 9000,
  video: true,
  chromeWebSecurity: false,
});
