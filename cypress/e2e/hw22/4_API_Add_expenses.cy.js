/// <reference types="cypress" />

describe("Add expense for car via API", () => {
  let sid;
  let createdCarId;
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
        cy.log("Created car ID:", createdCarId);
      }
    );
  });

  it("Add expense for created car", () => {
    cy.request({
      method: "POST",
      url: "/api/expenses",
      headers: {
        "Content-Type": "application/json",
        Cookie: `sid=${sid}`,
      },
      body: {
        carId: createdCarId,
        reportedAt: new Date().toISOString(),
        mileage: 300,
        liters: 30,
        totalCost: 3000,
        forceMileage: false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("status", "ok");
      expect(response.body.data).to.have.property("id").and.to.be.a("number");
      expect(response.body.data).to.have.property("carId", createdCarId);
      expect(response.body.data).to.have.property("liters", 30);
      expect(response.body.data).to.have.property("mileage", 300);
      expect(response.body.data).to.have.property("totalCost", 3000);
    });
  });
});
