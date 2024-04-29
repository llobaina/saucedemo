import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import * as dotenv from "dotenv";


dotenv.config();



export default defineConfig({
  env: {
    user_name: process.env.USER_NAME,
    password: process.env.PASSWORD
  },
  e2e: {
    baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
        // implement node event listeners here
        allureCypress(on);
    },
  },
})
