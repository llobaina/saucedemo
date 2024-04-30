// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add('login', (username=Cypress.env("user_name"), password=Cypress.env("password")) => {
    expect(username,"username was set").to.be.a("string").and.not.be.empty
    if (typeof password !== "string" || !password) {
        throw new Error("Missing password value, set using CYPRESS_password=...")
    }
    cy.session(
      [username, password],
        () => {
            cy.visit("/")
            cy.get("#user-name").type(username)
            cy.get("#password").type(`${password}{enter}`, { log: false })
            cy.url().should('contain', '/inventory.html')
        },
        {
            validate: () => {
                cy.visit('/inventory.html', { failOnStatusCode: false })
            },
        }
    )
})
