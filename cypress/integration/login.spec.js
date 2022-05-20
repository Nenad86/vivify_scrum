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
        cy.get(login.passwordEmailvalidationMessages).should("be.visible");
    })

    it("passwordFieldEmpty", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.loginButton).click();
        cy.get(login.passwordEmailvalidationMessages).should("be.visible");
    })

    it("allSpaces", () => {
        cy.get(login.emailInputField).type("  ");
        cy.get(login.passwordInputField).type("  ");
        cy.get(login.loginButton).click();
        cy.get(login.passwordEmailvalidationMessages).should("be.visible");
    })

    it("invalidCredentials", () => {
        cy.get(login.emailInputField).type(invalidEmail);
        cy.get(login.passwordInputField).type(invalidPassword);
        cy.get(login.loginButton).click();
        cy.get(login.invalidCredentialsValidation).should("be.visible");
    })

    it("emailWithoutMonkey", () => {
        cy.get(login.emailInputField).type(data.user.emailWithoutMonkey);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();
        cy.get(login.passwordEmailvalidationMessages).should("be.visible");
    })

    it("emailWithoutCom", () => {
        cy.get(login.emailInputField).type(data.user.emailWithoutCom);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();
        cy.get(login.passwordEmailvalidationMessages).should("be.visible");
    })

    it("passwordLessThanFiveCharacters", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.passwordFourCharacters);
        cy.get(login.loginButton).click();
        cy.get(login.passwordEmailvalidationMessages).should("be.visible");
    })

    it("incorrectEmail", () => {
        cy.get(login.emailInputField).type(invalidEmail);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();
        cy.get(login.invalidCredentialsValidation).should("be.visible");
    })

    it("incorrectPassword", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(invalidPassword);
        cy.get(login.loginButton).click();
        cy.get(login.invalidCredentialsValidation).should("be.visible");
    })

    it("loginValid", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();
        cy.wait(3000);
        cy.get(login.loginButton).should("not.exist");
    })
})