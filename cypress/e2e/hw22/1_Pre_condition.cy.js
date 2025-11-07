/// <reference types="cypress" />

import UserSid from "../../fixtures/user_sid.js";
describe("Pre-condition", () => {
  it("Create user via API", () => {
    cy.request({
      method: "POST",
      url: "/api/auth/signup",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        name: "Oleksii",
        lastName: "Nosach",
        email: Cypress.env("TEST_USER_EMAIL"),
        password: Cypress.env("TEST_USER_PASSWORD"),
        repeatPassword: Cypress.env("TEST_USER_PASSWORD"),
      },
    }).then((response) => {
      UserSid.saveSidFromResponse(response);
    });
  });
});
