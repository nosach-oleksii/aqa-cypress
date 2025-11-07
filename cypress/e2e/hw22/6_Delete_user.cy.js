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
  });
  it("Delete user via API", () => {
    cy.request({
      method: "DELETE",
      url: "api/users",
      headers: {
        "Content-Type": "application/json",
        Cookie: `sid=${sid}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");
      cy.clearCookie("sid");
      cy.writeFile("cypress/fixtures/user_sid.json", {});
      cy.writeFile("cypress/fixtures/response_last_car_created.json", {});
      cy.log("User deleted successfully via API");
    });
  });
});
