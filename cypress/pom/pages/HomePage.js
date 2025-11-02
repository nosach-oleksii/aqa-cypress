class HomePage {
  get signinButton() {
    return cy.get(".header_signin");
  }

  visit() {
    cy.visit("/");
  }

  openSignInForm() {
    this.signinButton.click();
  }
}

export default new HomePage();
