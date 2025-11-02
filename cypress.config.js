// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
// //   e2e: {
// //     baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space/",
// //     setupNodeEvents(on, config) {
// //       // implement node event listeners here
// //     },
// //   },
// //   specPattern: "cypress/e2e/hw21/**/*.cy.js",
// // });

import { time } from "console";
import { defineConfig } from "cypress";
import fs from "fs";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envFile = config.env.configFile || "prod";
      const pathToEnvFile = `cypress/env/${envFile}.env.json`;

      if (fs.existsSync(pathToEnvFile)) {
        const envConfig = JSON.parse(fs.readFileSync(pathToEnvFile));
        config.env = { ...config.env, ...envConfig };

        // Формуємо baseUrl у форматі https://username:password@host/
        if (
          envConfig.BASE_URL &&
          envConfig.AUTH_USERNAME &&
          envConfig.AUTH_PASSWORD
        ) {
          const cleanUrl = envConfig.BASE_URL.replace(
            /^https?:\/\//,
            ""
          ).replace(/\/$/, "");
          config.baseUrl = `https://${envConfig.AUTH_USERNAME}:${envConfig.AUTH_PASSWORD}@${cleanUrl}`;
        }
      } else {
        console.warn(`⚠️ Env file not found: ${pathToEnvFile}`);
      }

      return config;
    },
    retries: 0,
    specPattern: [
      "cypress/e2e/hw21/*.cy.{js,ts}",
      "!cypress/e2e/1-getting-started/**/*.cy.{js,ts}",
      "!cypress/e2e/2-advanced-examples/**/*.cy.{js,ts}",
    ],
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      timestamp: true,
    },
  },
});
