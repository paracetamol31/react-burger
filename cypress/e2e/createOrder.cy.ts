describe("createOrder.cy", () => {
    beforeEach(() => {
        cy.setCookie("accessToken", "testAccessToken");
        cy.intercept("GET", "ingredients", { fixture: "ingredients.json" });
        cy.intercept("GET", "user", { fixture: "user.json" });
        cy.intercept("POST", "orders", { fixture: "order.json" });
        cy.visit("http://localhost:3000/");
    });

    it("createOrder", () => {
        cy.testCard("Краторная булка N-200i");
        cy.testCard("Соус Spicy-X");
        cy.testCard("Соус Spicy-X");
        cy.testCard("Биокотлета из марсианской Магнолии");
        cy.testCard("Филе Люминесцентного тетраодонтимформа");
        cy.testCard("Соус фирменный Space Sauce");

        cy.get("[test-data=create-order-button]").click();
        cy.get("[test-data=order-details-order-id]").should("have.text", "26563");
    });
});