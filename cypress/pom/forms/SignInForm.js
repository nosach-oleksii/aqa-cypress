class SignInForm {
  get EmailField() {
    return cy.get("#signinEmail");
  }

  get PasswordField() {
    return cy.get("#signinPassword");
  }

  get loginButton() {
    return cy.get("app-signin-modal .btn-primary");
  }

  get wrongDataMessage() {
    return cy.contains("Wrong email or password");
  }

  get incorrectEmailMessage() {
    return cy.contains("Email is incorrect");
  }
  get emptyEmailMessage() {
    return cy.contains("Email required");
  }

  get emptyPasswordMessage() {
    return cy.contains("Password required");
  }

  enterEmail(email) {
    this.EmailField.type(email);
  }

  enterPassword(password) {
    this.PasswordField.type(password);
  }

  clickLoginButton() {
    this.PasswordField.type(password);
  }

  loginWithCredentials(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.loginButton.click();
  }

  triggerErrorMessagesForField(fieldName) {
    const element =
      fieldName === "email" ? this.EmailField : this.PasswordField;
    element.focus().blur();
  }

  verifyLoginButtonIsDisabled() {
    this.loginButton.should("be.disabled");
  }

  veryfyErrorMessageForFieldIsVisible(fieldName) {
    const element =
      fieldName === "email" ? this.EmailField : this.PasswordField;
    element.should("be.visible");
  }

  veryfyIncorrectEmailMessageIsVisible() {
    this.incorrectEmailMessage.should("be.visible");
  }

  verifyWrongDataMessageIsVisible() {
    this.wrongDataMessage.should("be.visible");
  }
}
export default new SignInForm();
