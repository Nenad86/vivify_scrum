import login from "../pages/loginPage.json"
import data from "../fixtures/data.json"

describe("loginUser", () =>{

    const faker = require("faker");

    const invalidEmail = faker.internet.email()
    const invalidPassword = faker.internet.password()

    beforeEach("visitUrl", () => {
        cy.visit("");
    })

    it("leave email field empty", () => {
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The email field must be a valid email");
    })

    it("leave password field empty", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The password field is required");
    })

    it("enter all spaces for email and password", () => {
        cy.get(login.emailInputField).type("  ");
        cy.get(login.passwordInputField).type("  ");
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).eq(0).should("be.visible").and("contain","The email field must be a valid email");
        cy.get(login.passwordEmailvalidationMessages).eq(1).should("be.visible").and("contain","The password field is required");
    })

    it("login with invalid credentials", () => {
        cy.get(login.emailInputField).type(invalidEmail);
        cy.get(login.passwordInputField).type(invalidPassword);
        cy.get(login.loginButton).click();

        cy.get(login.invalidCredentialsValidation).should("be.visible").and("contain","Oops! Your email/password combination is incorrect");
    })

    it("enter email without @", () => {
        cy.get(login.emailInputField).type(data.user.emailWithoutMonkey);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The email field must be a valid email");
    })

    it("enter email without .com", () => {
        cy.get(login.emailInputField).type(data.user.emailWithoutCom);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The email field must be a valid email");
    })

    it("enter password with less than 5 characters", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.passwordFourCharacters);
        cy.get(login.loginButton).click();

        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The password field must be at least 5 characters");
    })

    it("login with correct password & incorrect email", () => {
        cy.get(login.emailInputField).type(invalidEmail);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();

        cy.get(login.invalidCredentialsValidation).should("be.visible").and("contain","Oops! Your email/password combination is incorrect");
    })

    it("login with incorrect password & correct email", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(invalidPassword);
        cy.get(login.loginButton).click();

        cy.get(login.invalidCredentialsValidation).should("be.visible").and("contain","Oops! Your email/password combination is incorrect");
    })

    it("valid login", () => {
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click();
        cy.get(login.loginButton).should("not.exist");
        cy.get(login.profileButton).click();
        cy.get(login.settingsButton).click();
        cy.get(login.logOutButton).click();

        cy.get(login.loginButton).should('be.visible').and("contain", "Log In");
        cy.get(login.loginButton).should("have.css", "background-color", "rgb(78, 174, 147)");
    })
})