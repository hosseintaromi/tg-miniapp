/// <reference types="cypress" />

// Custom commands for the Telegram Mini App
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      visitLocale(locale: "en" | "fa", path?: string): Chainable<Element>;
      checkTranslation(key: string, expectedText: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("visitLocale", (locale: "en" | "fa", path = "/profile") => {
  cy.visit(`/${locale}${path}`);
});

Cypress.Commands.add("checkTranslation", (key: string, expectedText: string) => {
  cy.contains(expectedText).should("be.visible");
});

export {};
