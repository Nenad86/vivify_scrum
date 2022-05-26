import login from "../pages/loginPage.json"
import data from "../fixtures/data.json"

describe("loginUser", () =>{

    const faker = require("faker");

    const invalidEmail = faker.internet.email()
    const invalidPassword = faker.internet.password()

    beforeEach("visitUrl", () => {
        cy.visit("");
    })

    it("emailFieldEmpty", () => {
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The email field must be a valid email");
    })

    it("passwordFieldEmpty", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The password field is required");
    })

    it("allSpaces", () => {
        cy.get(login.emailInputField).type("  ");
        cy.get(login.passwordInputField).type("  ");
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).eq(0).should("be.visible").and("contain","The email field must be a valid email");
        cy.get(login.passwordEmailvalidationMessages).eq(1).should("be.visible").and("contain","The password field is required");
    })

    it("invalidCredentials", () => {
        cy.get(login.emailInputField).type(invalidEmail);
        cy.get(login.passwordInputField).type(invalidPassword);
        cy.get(login.loginButton).click();

        cy.get(login.invalidCredentialsValidation).should("be.visible").and("contain","Oops! Your email/password combination is incorrect");
    })

    it("emailWithoutMonkey", () => {
        cy.get(login.emailInputField).type(data.user.emailWithoutMonkey);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The email field must be a valid email");
    })

    it("emailWithoutCom", () => {
        cy.get(login.emailInputField).type(data.user.emailWithoutCom);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The email field must be a valid email");
    })

    it("passwordLessThanFiveCharacters", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.passwordFourCharacters);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The password field must be at least 5 characters");
    })

    it("incorrectEmail", () => {
        cy.get(login.emailInputField).type(invalidEmail);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.invalidCredentialsValidation).should("be.visible").and("contain","Oops! Your email/password combination is incorrect");
    })

    it("incorrectPassword", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(invalidPassword);
        cy.get(login.loginButton).click();

        cy.get(login.invalidCredentialsValidation).should("be.visible").and("contain","Oops! Your email/password combination is incorrect");
    })

    it("loginValid", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();
        cy.get(login.loginButton).should("not.exist");
        cy.get(login.profileButton).click();
        cy.get(login.settingsButton).click();
        cy.get(login.logOutButton).click();

        cy.get(login.loginButton).should('be.visible').and("contain", "Log In");
    })
})