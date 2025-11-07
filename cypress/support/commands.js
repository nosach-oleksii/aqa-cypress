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

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get("header button.btn-outline-white.header_signin")
    .should("contain.text", "Sign In")
    .click();
  cy.get("#signinEmail").type(username);
  cy.get("#signinPassword").type(password), { sensitive: true };
  cy.contains("button", "Login").click();
});

Cypress.Commands.add("logout", () => {
  cy.get("a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn")
    .should("contain.text", " Log out ")
    .click();
});
