/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
    * Custom command to login.
    * @param user user name
    * @param password password
    * @example
    * cy.login('user_name','password')
    */
    login(user?: string, password?: string): void


    /**
     * Get a DOM element base on attribute data-test's value
     * @param dataTestAttribute value of the attribute
     * @param args
     * @example
     * // this command
     * cy.getBySel("error")
     * // will selected this element
     * <input data-test="error">
     */
    getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;


    /**
     * Get a DOM element base on attribute data-test's value
     * @param dataTestAttribute part of the value of the attribute
     * @param args
     * @example
     * // this command
     * cy.getBySelLike("remove")
     * // will selected this element
     * <input data-test="remove-sauce-labs-backpack">
     */
    getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;


  }
}
