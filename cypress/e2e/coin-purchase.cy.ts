describe("Coin Purchase Flow", () => {
  beforeEach(() => {
    cy.visitLocale("en", "/buy-coins");
  });

  it("should display coin packages and allow selection", () => {
    // Check packages are displayed
    cy.contains("Choose a package").should("be.visible");
    cy.contains("100 Coins").should("be.visible");
    cy.contains("$1.99").should("be.visible");
    cy.contains("500 Coins").should("be.visible");
    cy.contains("$7.99").should("be.visible");

    // Select a different package
    cy.contains("500 Coins").parent().click();
    cy.contains("500 Coins").parent().should("have.class", "ring-2");
  });

  it("should complete purchase and update balance", () => {
    // Get initial balance
    cy.visitLocale("en", "/profile");
    cy.contains("1,250").should("be.visible");

    // Go to buy coins and purchase
    cy.visitLocale("en", "/buy-coins");
    cy.contains("Buy Now").click();

    // Check balance increased
    cy.visitLocale("en", "/profile");
    cy.contains("1,350").should("be.visible"); // 1250 + 100

    // Check payment history
    cy.visitLocale("en", "/payments");
    cy.contains("100 Coins").should("be.visible");
    cy.contains("+$10.00").should("be.visible");
  });
});
