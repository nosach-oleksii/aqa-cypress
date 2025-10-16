/// <reference types="cypress" />

describe("Registration form validation", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });

    it("Check mandatory fields and validation messages", () => {
        // Клік по Register без ввода даних
        cy.get("button.btn.btn-primary[disabled]").should("exist").and("have.text", "Register").and("be.visible");

        // Перевірка обов'язкових полів
        cy.get("input[id='signupName']").click().blur();
        cy.contains("Name required").should("contain.text", "Name required");
        cy.get("input[id='signupLastName']").click().blur();
        cy.contains("Last name required").should("contain.text", "Last name required");
        cy.get("input[id='signupEmail']").click().blur();
        cy.contains("Email required").should("contain.text", "Email required");
        cy.get("input[id='signupPassword']").click().blur();
        cy.contains("Password required").should("contain.text", "Password required");
        cy.get("input[id='signupRepeatPassword']").click().blur();
        cy.contains("Re-enter password required").should("contain.text", "Re-enter password required");

        // Не Англійські літери в імені
        cy.get("#signupName").clear().type("Алєкс").blur();
        cy.get(".invalid-feedback").should("contain.text", "Name is invalid");
        cy.get("#signupName").should("have.class", "is-invalid");
        cy.get("#signupName").clear();

        // Перевірка неправильного формату email
        cy.get("input[id='signupEmail']").type("wrongemail");
        cy.contains("Email is incorrect").should("contain.text", "Email is incorrect");

        // Перевірка короткого імені
        cy.get("input[id='signupName']").type("A");
        cy.contains("Name has to be from 2 to 20 characters long").should("be.visible");

        // Перевірка довгого імені
        cy.get("input[id='signupName']").clear().type("A".repeat(21));
        cy.contains("Name has to be from 2 to 20 characters long").should("be.visible");

        // Перевірка короткого пароля
        cy.get("input[id='signupPassword']").type("Test1");
        cy.contains("Password has to be from 8 to 15 characters long").should("be.visible");

        // Перевірка пароля без великих/цифр
        cy.get("input[id='signupPassword']").clear().type("password");
        cy.contains("Password has to be from 8 to 15 characters long").should("be.visible");

        // Перевірка розбіжності паролів
        cy.get("input[id='signupPassword']").clear().type("Test1234");
        cy.get("input[id='signupRepeatPassword']").type("Test12345");
        cy.contains("Passwords do not match").should("be.visible");

        // Перевірте, що кнопка Register не активна при помилках
        cy.contains("Register").should("be.disabled");
    });

    it("Registration and login flow", () => {
        const email = "nosach.oleksii+testUser" + Date.now() + "@gmail.com";
        const password = "Test1234";

        // Реєстрація нового користувача
        cy.get("input[id='signupName']").type("Jet");
        cy.get("input[id='signupLastName']").type("Li");
        cy.get("input[id='signupEmail']").type(email);
        cy.get("input[id='signupPassword']").type(password);
        cy.get("input[id='signupRepeatPassword']").type(password);
        cy.contains("Register").click();

        cy.get("a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn").should("be.visible").click(); // logout

        // Логін з тим же email та паролем
        cy.get("header button.btn.btn-outline-white.header_signin").click();
        cy.get("input[id='signinEmail']").type(email);
        cy.get("input[id='signinPassword']").type(password);
        cy.contains("Login").click();

        // Перевірка успішного логіну
        cy.get("a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn").should("be.visible");
        cy.get("button.btn.btn-outline-white.header_signin").should("not.exist");
    });
});
