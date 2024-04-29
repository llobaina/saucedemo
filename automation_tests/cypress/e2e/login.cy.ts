import * as loginData from "@fixtures/login_data.json";

describe("Login", () => {
    beforeEach(()=>{
        cy.visit("/")
    });

    it("Should log in without issues using button Login", () => {
        const user_name = Cypress.env("user_name")
        const password = Cypress.env("password")

        cy.get("#user-name").clear()
        cy.get("#user-name").type(user_name)

        cy.get("#password").clear()
        cy.get("#password").type(password, {log:false})
        cy.get("#login-button").click()

        cy.url().should("include", "/inventory.html")

    });

    it("Should log in without issues using Enter keyboard", () => {
        const user_name = Cypress.env("user_name")
        const password = Cypress.env("password")

        cy.get("#user-name").clear()
        cy.get("#user-name").type(user_name)

        cy.get("#password").clear()
        cy.get("#password").type(`${password}{enter}`, {log:false})


        cy.url().should("include", "/inventory.html")

    });

    it("Should show an error for invalid password and correct user name", () => {
        loginData.invalid_password.forEach((user) => {
            cy.get("#user-name").clear()
            cy.get("#user-name").type(user.username)

            cy.get("#password").clear()
            cy.get("#password").type(user.password, {log:false})
            cy.get("#login-button").click()

            cy.get(".error")
            .should("have.length", 3)
            .then((errorMessage) => {
                cy.wrap(errorMessage)
                    .last()
                    .invoke("text")
                    .should("include", "Username and password do not match any user in this service")
            })
        })
    });

    it("Should show an error for invalid user name and correct password", () => {
        loginData.invalid_user_name.forEach((user) => {
            cy.get("#user-name").clear()
            cy.get("#user-name").type(user.username)

            cy.get("#password").clear()
            cy.get("#password").type(user.password, {log:false})
            cy.get("#login-button").click()

            cy.get(".error")
            .should("have.length", 3)
            .then((errorMessage) => {
                cy.wrap(errorMessage)
                    .last()
                    .invoke("text")
                    .should("include", "Username and password do not match any user in this service")
            })
        })
    });

    it("Should show an error for invalid user name and invalid password", () => {
        loginData.invalid_user_name_and_password.forEach((user) => {
            cy.get("#user-name").clear()
            cy.get("#user-name").type(user.username)

            cy.get("#password").clear()
            cy.get("#password").type(user.password, {log:false})
            cy.get("#login-button").click()

            cy.get(".error")
            .should("have.length", 3)
            .then((errorMessage) => {
                cy.wrap(errorMessage)
                    .last()
                    .invoke("text")
                    .should("include", "Username and password do not match any user in this service")
            })
        })
    });

    it("Should show an error for locked out user", () => {

        cy.get("#user-name").type(loginData.locked_out_user.username)
        cy.get("#password").type(loginData.locked_out_user.password, {log:false})
        cy.get("#login-button").click()

        cy.getBySel("error")
            .should("have.text", "Epic sadface: Sorry, this user has been locked out.")

    });

    it("Should show an error for empty user name", () => {
        cy.get("#password").type("password", {log:false})
        cy.get("#login-button").click()

        cy.getBySel("error")
            .should("have.text", "Epic sadface: Username is required")
    });

    it("Should show an error for empty password", () => {
        cy.get("#user-name").type("user_name")
        cy.get("#login-button").click()

        cy.getBySel("error")
            .should("have.text", "Epic sadface: Password is required")
    });

    it("Should show an error for empty user name and password", () => {
        cy.get("#login-button").click()

        cy.getBySel("error")
            .should("have.text", "Epic sadface: Username and Password are required")
    });
})