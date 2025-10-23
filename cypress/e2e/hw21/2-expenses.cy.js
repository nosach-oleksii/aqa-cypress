import ExpensesPage from "../../pom/pages/ExpensesPage";
import HomePage from "../../pom/pages/HomePage";
import SignInForm from "../../pom/forms/SignInForm";

describe("Adding new expenses", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials(
      Cypress.env("TEST_USER_EMAIL"),
      Cypress.env("TEST_USER_PASSWORD")
    );
    ExpensesPage.navigateExpensesPage();
    ExpensesPage.pageHeaderExpenses.should("be.visible");
  });
  it.only("Add expenses", () => {
    ExpensesPage.addNewExpense("BMW X5", "1000", "50", "100");
    // GaragePage.verifyLastAddedCar("Audi A6");
  });
});
