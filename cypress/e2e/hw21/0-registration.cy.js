/// <reference types="cypress" />

describe("Registration form validation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
  });

  it("Registration and login flow", () => {
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    // Реєстрація нового користувача
    cy.get("#signupName").type("Jet");
    cy.get("#signupLastName").type("Li");
    cy.get("#signupEmail").type(email);
    cy.get("#signupPassword").type(password);
    cy.get("#signupRepeatPassword").type(password);
    cy.contains("Register").click();
    // logout
    cy.get("a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn")
      .should("be.visible")
      .click();
  });
});
