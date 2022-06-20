// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import boardElements from "./elements/boardElements";
import loginElements from "./elements/loginElements";
import organizationElements from "./elements/organizationElements";


Cypress.Commands.add('loginViaUI', (email = Cypress.env('email'), password = Cypress.env('password')) => { 
    cy.get(loginElements.emailInputField).type(email);
    cy.get(loginElements.passwordInputField).type(password);
    cy.get(loginElements.loginButton).click();
})

Cypress.Commands.add('logOutViaUI', () => { 
    cy.get(loginElements.profileButton).click();
    cy.get(loginElements.settingsButton).click();
    cy.get(loginElements.logOutButton).click();
})

Cypress.Commands.add('createOrganizationViaUI', (name) => { 
    cy.get(organizationElements.addOrganizationField).click();
    cy.get(organizationElements.organizationNameField).type(`${name}{enter}`);
    cy.get(organizationElements.nextButton).click();
    cy.get(organizationElements.nextButton).click();
    cy.get(organizationElements.boardsPopUpOkButton).click({force: true});
    cy.get(organizationElements.scrumSign).should("be.visible").click();

    cy.get(organizationElements.titleField).should("be.visible").and("contain", name);
})

Cypress.Commands.add('deleteOrganizationViaUI', (name, password = Cypress.env('password')) => { 
    cy.get(organizationElements.organizationList).eq(1).click();
    cy.get(organizationElements.organizationSettings).click();
    cy.get(organizationElements.deleteOrganizationButton).scrollIntoView().click({force: true});
    cy.get(organizationElements.passwordField).type(password);
    cy.get(organizationElements.yesButton).click();
    cy.get(organizationElements.titleField).should("be.visible").and("not.contain", name);
})

Cypress.Commands.add('createScrumBoardAndAssertNameUI', (name) => { 
        cy.get(organizationElements.organizationList).click();
        cy.get(boardElements.xButton).click();
        cy.get(boardElements.addBoardField).click();
        cy.get(boardElements.addBoardTitle).type(name);
        cy.get(boardElements.nextButton).click();
        cy.get(boardElements.scrumBoardButton).click();
        cy.get(boardElements.nextButton).click();
        cy.get(boardElements.nextButton).click();
        cy.get(boardElements.nextButton).click();

        cy.get(boardElements.boardList).should("be.visible").and("have.text", name);
})

Cypress.Commands.add('createKanbanBoardAndAssertNameUI', (name) => { 
        cy.get(organizationElements.organizationList).click();
        cy.get(boardElements.xButton).click();
        cy.get(boardElements.addBoardField).click();
        cy.get(boardElements.addBoardTitle).type(name);
        cy.get(boardElements.nextButton).click();
        cy.get(boardElements.kanbanBoardButton).eq(1).click();
        cy.get(boardElements.nextButton).click();
        cy.get(boardElements.nextButton).click();
        cy.get(boardElements.nextButton).click({force:true});

        cy.get(boardElements.boardList).should("be.visible").and("have.text", name);
})

Cypress.Commands.add('deleteBoardUI', (name) => { 
        cy.get(boardElements.boardList).click();
        cy.get(boardElements.boardSettingsButton).click({force: true});
        cy.get(boardElements.deleteBoardButton).scrollIntoView().click();
        cy.get(boardElements.saveButton).click();

        cy.get(boardElements.addBoardField).should("not.contain", name);
})
