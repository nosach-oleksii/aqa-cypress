/// <reference types="cypress" />

describe("Validate created car", () => {
  let sid;
  let createdCarId;
  let createdBrandCar = "";
  let createdModelCar;
  let createdMileageCar;
  before(() => {
    cy.readFile("cypress/fixtures/user_sid.json").then((file) => {
      sid = file.sid;
      cy.log("SID Cookie:", sid);
      if (!sid) {
        throw new Error("⚠️ Cookie 'sid' не знайдено у user_sid.json");
      }
    });
    cy.readFile("cypress/fixtures/response_last_car_created.json").then(
      (savedResponse) => {
        createdCarId = savedResponse.data.id;
        createdBrandCar = savedResponse.data.brand;
        createdModelCar = savedResponse.data.model;
        createdMileageCar = savedResponse.data.mileage;
        cy.log("Created car ID:", createdCarId);
        cy.log("Created car Brand:", createdBrandCar);
        cy.log("Created car Model:", createdModelCar);
        cy.log("Created car Mileage:", createdMileageCar);
      }
    );
  });

  it("Validate car details", () => {
    cy.request({
      method: "GET",
      url: "/api/cars",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `sid=${sid}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log("User`s cars:", JSON.stringify(response.body));

      const createdCar = response.body.data.find(
        (car) => car.id === createdCarId
      );
      cy.log("Created Car Details:", JSON.stringify(createdCar));
      cy.log("Created car ID:", createdCarId);
      cy.log("Created car Brand:", createdBrandCar);
      cy.log("Created car Model:", createdModelCar);
      cy.log("Created car Mileage:", createdMileageCar);
      expect(createdCar).to.not.be.undefined;
      expect(createdCar).to.have.property("brand", createdBrandCar);
      expect(createdCar).to.have.property("model", createdModelCar);
      expect(createdCar).to.have.property("mileage", createdMileageCar);
    });
  });
});
