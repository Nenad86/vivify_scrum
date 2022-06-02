import data from "../fixtures/data.json"
import Login from "../support/classes/login"

const login = new Login();

describe("loginUser", () =>{

    const faker = require("faker");

    const invalidEmail = faker.internet.email()
    const invalidPassword = faker.internet.password()

    beforeEach("visitUrl", () => {
        cy.visit("");
    })

    after('Log out', () => {
        login.logOutFunction();
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
       login.loginFunction(invalidEmail, invalidPassword);     
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
        login.loginFunction(data.user.email, data.user.password);
        login.loginButtonValidation();
    })
})