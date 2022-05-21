import login from "../pages/loginPage.json"
import data from "../fixtures/data.json"
import organization from "../pages/organizationPage.json"

describe("createOrganization", () =>{

    const faker = require("faker");

    const name = faker.name.firstName();
    const lastName =faker.name.lastName();

    beforeEach("visitUrl", () => {
        cy.visit("");
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click(); 
        cy.wait(3000);   
    })

    it("createOrganizationCanceled", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.organizationXButton).eq(1).click();
    })

    it("createOrganizationValid", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationTitle", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.updateNameField).type(lastName);
        cy.get(organization.updateButton).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationTitleAllSpaces", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.updateNameField).clear().type("   ");
        cy.get(organization.updateButton).click({multiple:true});
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationWorkDays", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.workingDaysCheckbox).eq(6).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationVacationDaysEmpty", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.vacationDaysField).clear();
        cy.get(organization.updateButton).eq(1).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationVacationDays366", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.vacationDaysField).clear().type("366");
        cy.get(organization.updateButton).eq(1).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationVacatioMonthsEmpty", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.vacationMonthsField).clear()
        cy.get(organization.updateButton).eq(1).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationTitleMainScreen", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.editButton).click();
        cy.get(organization.titleField).clear().type(lastName);
        cy.get(organization.checkMark).click();
        cy.get(organization.boardsPopUpOkButton).click({multiple: true});
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it.only("updateOrganizationTitle256", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.organizationSettings, {timeout : 3000}).eq(6).click();
        cy.get(organization.updateNameField).type(data.user.longTitle);
        cy.get(organization.updateButton).click({multiple:true});
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })
})