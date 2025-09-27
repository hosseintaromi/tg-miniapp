describe("App Navigation", () => {
  beforeEach(() => {
    cy.visitLocale("en");
  });

  it("should navigate between tabs", () => {
    // Start at profile page
    cy.url().should("include", "/en/profile");
    cy.contains("Profile").should("be.visible");
    cy.contains("Ethan Carter").should("be.visible");
    cy.contains("Balance").should("be.visible");

    // Navigate to Consumption
    cy.contains("Consumption").click();
    cy.url().should("include", "/en/consumption");
    cy.contains("Past Consumption").should("be.visible");

    // Navigate to Payments
    cy.contains("Payments").click();
    cy.url().should("include", "/en/payments");
    cy.contains("Past Transactions").should("be.visible");

    // Navigate to Buy Coins
    cy.contains("Buy Coins").click();
    cy.url().should("include", "/en/buy-coins");
    cy.contains("Choose a package").should("be.visible");

    // Navigate back to Profile
    cy.contains("Profile").click();
    cy.url().should("include", "/en/profile");
  });

  it("should handle Persian locale and RTL", () => {
    cy.visitLocale("fa");
    cy.url().should("include", "/fa/profile");

    // Check Persian translations
    cy.contains("پروفایل").should("be.visible");
    cy.contains("موجودی").should("be.visible");

    // Check RTL direction
    cy.get("html").should("have.attr", "dir", "rtl");
    cy.get("html").should("have.attr", "lang", "fa");
  });
});
