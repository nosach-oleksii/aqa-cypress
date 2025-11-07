/// <reference types="cypress" />
import GaragePage from "../../pom/pages/GaragePage";
describe("Create car and validate response", () => {
  it("Intercepting create car", () => {
    cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
    cy.intercept("POST", "/api/cars").as("createCar");

    GaragePage.addNewCar("BMW", "X5", "0");

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.status).to.eq("ok");
      expect(response.body.data).to.have.property("id");
      expect(response.body.data).to.have.property("brand", "BMW");
      expect(response.body.data).to.have.property("model", "X5");
      expect(response.body.data).to.have.property("mileage", 0);
      console.log("Created Car ID:", response.body.data.id);
      cy.writeFile(
        `cypress/fixtures/response_last_car_created.json`,
        response.body
      );
    });
  });
});
