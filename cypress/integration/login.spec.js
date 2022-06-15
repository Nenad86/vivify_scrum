import data from "../fixtures/data.json"
import Login from "../support/classes/login"

const login = new Login();

describe("loginUser", () =>{

    const faker = require("faker");

    const invalidEmail = faker.internet.email()
    const invalidPassword = faker.internet.password()

    beforeEach("visitUrl", () => {
        cy.visit("/login");
    })

    after('Log out', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/logout'
        }).as('logout');

        cy.logOutViaUI();

        cy.wait('@logout').then(({response}) => {
            expect(response.statusCode).eq(201);
        })

        login.loginButtonValidation();
    })

    it("leave all fields empty", () => {
        login.loginEmptyFields();
        login.emaiValidationMessage();
        login.passwordRequiredValidation();     
    })

    it("enter all spaces for email and password", () => {
        login.loginFunction(data.user.onlySpaces, data.user.onlySpaces);
        login.emaiValidationMessage();
        login.passwordRequiredValidation(); 
    })

    it("login with invalid credentials", () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/login'
          }).as('login');

       login.loginFunction(invalidEmail, invalidPassword); 
       
       cy.wait('@login').then(({ response }) => {
        expect(response.statusCode).eq(401);
        expect(response.body.message).eq("Unauthenticated.");
      });

       login.invalidCredentialsMessage();     
    })

    it("enter email without @", () => {
        login.loginFunction(data.user.emailWithoutMonkey, data.user.password);
        login.emaiValidationMessage();
    })

    it("enter email without .com", () => {
        login.loginFunction(data.user.emailWithoutCom, data.user.password);
        login.emaiValidationMessage();
    })

    it("enter password with less than 5 characters", () => {
        login.loginFunction(data.user.email, data.user.passwordFourCharacters);
        login.passwordLessCharacters();  
    })

    it("login with correct password & incorrect email", () => {
        login.loginFunction(invalidEmail, data.user.password);
        login.invalidCredentialsMessage();  
    })

    it("login with incorrect password & correct email", () => {
        login.loginFunction(data.user.email, invalidPassword);
        login.invalidCredentialsMessage(); 
    })

    it("valid login", () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v2/my-organizations'
          }).as('login');

        cy.loginViaUI();

        cy.wait('@login', {timeout: 10000}).then(({ response }) => {
            expect(response.statusCode).eq(200);
          });
        login.loginButtonValidation();
    })
})