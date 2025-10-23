/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignInForm from "../../pom/forms/SignInForm";

describe("Sign In form with POM", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
  });

  // Успішна авторизація
  it("Successful sign in", () => {
    SignInForm.loginWithCredentials(
      Cypress.env("TEST_USER_EMAIL"),
      Cypress.env("TEST_USER_PASSWORD")
    );
    cy.get("h1").should("have.text", "Garage");
  });
});
