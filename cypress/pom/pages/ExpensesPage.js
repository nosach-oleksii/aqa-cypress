class ExpensesPage {
  get pageHeaderExpenses() {
    return cy.contains("h1", "Fuel expenses");
  }

  get navigateToExpensesPage() {
    return cy.get('a[routerlink="expenses"]');
  }

  get addNewExpensesButton() {
    return cy.get("div.panel-page_heading .btn-primary");
  }

  get vehicleDropdown() {
    return cy.get("#addExpenseCar");
  }

  get dateField() {
    return cy.get("#addExpenseDate");
  }

  get mileageField() {
    return cy.get("#addExpenseMileage");
  }

  get litersField() {
    return cy.get("#addExpenseLiters");
  }

  get costField() {
    return cy.get("#addExpenseTotalCost");
  }

  get submitAddingFormButton() {
    return cy.get("app-add-expense-modal .btn-primary");
  }

  get addNewExpensesformHeader() {
    return cy.get(".modal-header");
  }

  //   get addedExpenses() {
  //     return cy.get("p.car_name");
  //   }

  visit() {
    cy.visit("/panel/expenses");
  }

  navigateExpensesPage() {
    this.navigateToExpensesPage.click();
  }
  get date() {
    const currentDate = new Date();
    const localDate = currentDate.toLocaleDateString("uk-UA"); // формат "22.10.2025"
    return localDate;
  }
  addNewExpense(vehicle, mileage, liters, cost) {
    this.addNewExpensesButton.click();
    this.vehicleDropdown.select(vehicle).last();
    this.dateField.clear().type(this.date);
    this.mileageField.clear().type(mileage);
    this.litersField.type(liters);
    this.costField.type(cost);
    this.submitAddingFormButton.click();
  }

  //   verifyLastAddedExpenses(carName) {
  //     this.addedExpenses.first().should("have.text", carName);
  //   }
}

export default new ExpensesPage();
