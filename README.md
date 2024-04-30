
# Test saucedemo website

## Prerequisites

This project requires [Node.js](https://nodejs.org/en/) and [Java JDK](https://www.oracle.com/java/technologies/downloads/) to be installed on your machine.

```shell
cd automation_tests/
npm install
```

### Start Cypress

Run the test cases with default values from .env file

```shell
npx cypress run
```

Run the test cases with another username

```shell
npx cypress run --env user_name=problem_user
```

### Test report tool

Allure was used for the test reports.

After run the test cases run allure for show the reports

```shell
npx allure-commandline serve allure-results
```
