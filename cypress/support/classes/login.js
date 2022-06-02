import login from "../elements/loginElements"
import data from "../../fixtures/data.json"
import loginElements from "../elements/loginElements";

class Login {
    loginFunction(email, password){
        cy.get(login.emailInputField).type(email);
        cy.get(login.passwordInputField).type(password);
        cy.get(login.loginButton).click();
    }

    logOutFunction(){
        cy.get(login.profileButton).click();
        cy.get(login.settingsButton).click();
        cy.get(login.logOutButton).click();
    }

    loginEmptyFields(){
        cy.get(loginElements.loginButton).should("be.visible").click();
    }

    passwordRequiredValidation(){
        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The password field is required");
    }

    emaiValidationMessage (){
        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The email field must be a valid email");
    }

    invalidCredentialsMessage(){
        cy.get(login.invalidCredentialsValidation).should("be.visible").and("contain","Oops! Your email/password combination is incorrect");
    }

    passwordLessCharacters(){
        cy.get(login.passwordEmailvalidationMessages).should("be.visible").and("contain","The password field must be at least 5 characters");
    }

    loginButtonNotExist(){
        cy.get(login.loginButton).should("not.exist");
    }

    loginButtonValidation(){
        cy.get(login.loginButton).should('be.visible').and("contain", "Log In");
        cy.get(login.loginButton).should("have.css", "background-color", "rgb(78, 174, 147)");
    }
}

export default Login;
