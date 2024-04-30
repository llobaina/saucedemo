describe("Product", () => {

    beforeEach(()=>{
        cy.login()
        cy.visit("/inventory.html",{failOnStatusCode: false})
    });

    it ("Should show the button remove after add sauce labs backpack to cart", () => {
        cy.getBySel("add-to-cart-sauce-labs-backpack").click()
        cy.getBySel("remove-sauce-labs-backpack")
            .should("be.visible")
    });

    it ("Should show 1 in the cart after add sauce labs backpack to cart", () => {
        cy.getBySel("add-to-cart-sauce-labs-backpack").click()
        cy.getBySel("shopping-cart-link")
            .then((cartLink) => {
                cy.wrap(cartLink)
                    .first()
                    .should("have.text", "1")
            })
    });

    it ("Should fail if any product don't show the Remove button after click on add to cart", () => {
        cy.getBySel("inventory-list")
            .find("[data-test=inventory-item-description]")
            .each(($product, $index, $list) => {
                cy.wrap($product)
                    .find("[data-test*=add-to-cart]").as("button-add")
                    .click()


                cy.get("@button-add")
                    .should("not.exist")

                cy.wrap($product)
                    .find("[data-test*=remove]")
                    .should("be.visible")
            })
    });

    it ("Should show the total number of items in the cart after add all products to cart", () => {
        cy.getBySel("inventory-list")
            .find("[data-test=inventory-item-description]")
            .each(($product, $index, $list) => {
                cy.wrap($product)
                    .find("[data-test*=add-to-cart]").as("button-add")
                    .click()
            })
            .then(($list) => {
                cy.getBySel("shopping-cart-link")
                    .then((cartLink) => {
                        cy.wrap(cartLink)
                            .first()
                            .should("have.text", $list.length)
                    })
            })
    });

    it ("Fail if any product can't be added to cart and show it's name", () => {
        cy.getBySel("inventory-list")
            .find("[data-test=inventory-item-description]")
            .each(($product, $index, $list) => {
                cy.wrap($product)
                    .find("[data-test*=add-to-cart]").as("button-add")
                    .click()

                cy.wrap($product)
                    .find("button")
                    .first()
                    .then(($button) => {
                        if ($button.text() !== "Remove") {
                            cy.wrap($product)
                                .find("[data-test=inventory-item-name]")
                                .then((name) => {
                                    cy.log(`**🔥🔥🔥 Failed to add product: ${name.text()} 🔥🔥🔥**`)
                                })
                        }
                    })
            })
            .then(($list) => {
                cy.getBySelLike("add-to-cart")
                    .should("have.length", 0)

                cy.getBySelLike("remove")
                    .should("have.length", $list.length)
            })
    });

    it ("Show products ordered Z - A", () => {
        cy.getBySel("product-sort-container")
            .select("za")

        cy.getBySel("product-sort-container")
            .should("have.value", "za")


        cy.getBySel("inventory-item-name")
            .should("have.length.gt", 1)

        cy.getBySel("inventory-item-name").then(($product_names) => {
            const innerText = (el) => el.innerText
            const products = Cypress._.map($product_names, (el) =>innerText(el))

            const sorted = Cypress._.orderBy(products, ["desc"])
            expect(sorted).to.deep.equal(products)
        })
    });

    it ("Show products ordered A - Z", () => {
        cy.getBySel("inventory-item-name")
            .should("have.length.gt", 1)

        cy.getBySel("inventory-item-name").then(($product_names) => {
            const innerText = (el) => el.innerText
            const products = Cypress._.map($product_names, (el) =>innerText(el))

            const sorted = Cypress._.sortBy(products)
            expect(sorted).to.deep.equal(products)
        })
    });

    it ("Show products ordered by price as low to high", () => {

        cy.getBySel("product-sort-container")
            .select("lohi")

        cy.getBySel("product-sort-container")
            .should("have.value", "lohi")

        cy.getBySel("inventory-item-name")
            .should("have.length.gt", 1)
            .then((items) => {
                cy.getBySel("inventory-item-price").should("have.length", items.length)
            })

        cy.getBySel("inventory-item-price").then(($prices) => {
            const innerText = (el) => el.innerText
            const firstWord = (text) => text.split(" ")[0]
            const justDigits = (str) => str.replace(/[^0-9.]/g, "")
            const prices = Cypress._.map($prices, (el) =>
              parseFloat(justDigits(firstWord(innerText(el)))),
            )

            const sorted = Cypress._.sortBy(prices)
            expect(sorted).to.deep.equal(prices)
            return prices
        })
    });

    it ("Show products ordered by price as high to low", () => {

        cy.getBySel("product-sort-container")
            .select("hilo")

        cy.getBySel("product-sort-container")
            .should("have.value", "hilo")

        cy.getBySel("inventory-item-name")
            .should("have.length.gt", 1)
            .then((items) => {
                cy.getBySel("inventory-item-price").should("have.length", items.length)
            })

        cy.getBySel("inventory-item-price").then(($prices) => {
            const innerText = (el) => el.innerText
            const firstWord = (text) => text.split(" ")[0]
            const justDigits = (str) => str.replace(/[^0-9.]/g, "")
            const prices = Cypress._.map($prices, (el) =>
              parseFloat(justDigits(firstWord(innerText(el)))),
            )

            const sorted = Cypress._.orderBy(prices, ["desc"])
            expect(sorted).to.deep.equal(prices)
            return prices
        })
    });

})