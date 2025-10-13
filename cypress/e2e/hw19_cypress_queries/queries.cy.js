/// <reference types="cypress" />

describe("Search headers elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Find button Home", () => {
    cy.get("header a.btn.header-link.-active").should("contain.text", "Home");
  });

  it("Find button About", () => {
    cy.get('header [appscrollto="aboutSection"]').should(
      "contain.text",
      "About"
    );
  });

  it("Find button Contacts", () => {
    cy.get('header [appscrollto="contactsSection"]').should(
      "contain.text",
      "Contacts"
    );
  });

  it("Find button Guest log in", () => {
    cy.get("header button.header-link.-guest").should(
      "contain.text",
      "Guest log in"
    );
  });

  it("Find button Sign In", () => {
    cy.get("header button.btn.btn-outline-white.header_signin").should(
      "contain.text",
      "Sign In"
    );
  });
});

describe("Search elements sign up", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("open sign up", () => {
    cy.get("button.hero-descriptor_btn.btn.btn-primary").should(
      "contain.text",
      "Sign up"
    );
  });
});

describe("Search footers elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("icon facebook", () => {
    cy.get("span.socials_icon.icon.icon-facebook").should("exist");
  });

  it("icon telegram", () => {
    cy.get("span.socials_icon.icon.icon-telegram").should("exist");
  });

  it("icon youtube", () => {
    cy.get("span.socials_icon.icon.icon-youtube").should("exist");
  });

  it("icon instagram", () => {
    cy.get("span.socials_icon.icon.icon-instagram").should("exist");
  });

  it("icon linkedin", () => {
    cy.get(".socials_link").filter(
      '[href="https://www.linkedin.com/school/ithillel/"]'
    );
  });

  it("contact link ithillel.ua", () => {
    cy.get("a.contacts_link.display-4").should(
      "have.attr",
      "href",
      "https://ithillel.ua"
    );
  });

  it("contact email ithillel", () => {
    cy.get("a.contacts_link.h4").should(
      "have.attr",
      "href",
      "mailto:developer@ithillel.ua"
    );
  });
});
