const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://app.storyblok.com",
    specPattern: ["cypress/e2e/tests/*.js"],
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "./test-reports/",
      charts: true,
      code: false,
    },
  },
  retries: 2,
  defaultCommandTimeout: 8000
});