describe("Data Persistence", () => {
  it("should persist state across page reloads", () => {
    // Visit profile and check initial balance
    cy.visitLocale("en", "/profile");
    cy.contains("1,250").should("be.visible");

    // Make a purchase
    cy.visitLocale("en", "/buy-coins");
    cy.contains("Buy Now").click();

    // Check updated balance
    cy.visitLocale("en", "/profile");
    cy.contains("1,350").should("be.visible");

    // Reload page and verify persistence
    cy.reload();
    cy.contains("1,350").should("be.visible");

    // Check payment history persists
    cy.visitLocale("en", "/payments");
    cy.contains("100 Coins").should("be.visible");
    cy.reload();
    cy.contains("100 Coins").should("be.visible");
  });

  it("should maintain state when switching locales", () => {
    // Make purchase in English
    cy.visitLocale("en", "/buy-coins");
    cy.contains("Buy Now").click();

    // Switch to Persian and verify balance
    cy.visitLocale("fa", "/profile");
    cy.contains("1,350").should("be.visible");

    // Switch back to English
    cy.visitLocale("en", "/profile");
    cy.contains("1,350").should("be.visible");
  });
});
