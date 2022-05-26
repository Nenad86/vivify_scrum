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
        
        cy.get(login.loginButton).should("not.exist");   
    })

    afterEach('logOut', () => {
        cy.get(login.profileButton).click();

        cy.get(organization.titleField).should("not.exist");

        cy.get(login.settingsButton).click();
        cy.get(login.logOutButton).click();

        cy.get(login.loginButton).should('be.visible').and("contain", "Log In");
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
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();

        cy.get(organization.titleField).should("be.visible").and("not.contain", name);
    })

    it("updateOrganizationTitle", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.updateNameField).type(lastName);
        cy.get(organization.updateButton).eq(0).click();

        cy.get(organization.organizationList).eq(1).should("be.visible").and("contain", lastName);

        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();

        cy.get(organization.titleField).should("be.visible").and("not.contain", lastName);
    })

    it("updateOrganizationTitleAllSpaces", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.updateNameField).clear().type("   ");
        cy.get(organization.updateButton).click({multiple:true});

        cy.get(organization.nameValidationMessage).scrollIntoView().should("be.visible").and("contain", "The name field is required");

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
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.workingDaysCheckbox).eq(6).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it.only("updateOrganizationVacationDaysEmpty", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.vacationDaysField).clear();
        cy.get(organization.updateButton).eq(1).click();

        cy.get(organization.vacationValidationMessage).eq(1).shoudl("be.visible").and("have.text", "The vacation days field is required");
        
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();

        cy.get(organization.titleField).should("be.visible").and("not.contain", name);
    })

    it("updateOrganizationVacationDays366", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);
        
        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.vacationDaysField).clear().type("366");
        cy.get(organization.updateButton).eq(1).click();

        cy.get(organization.vacationValidationMessage).eq(1).shoudl("be.visible").and("have.text", "The vacation days field must be between 0 and 365");
        
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
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.vacationMonthsField).clear()
        cy.get(organization.updateButton).eq(1).click();

        cy.get(organization.vacationValidationMessage).eq(2).shoudl("be.visible").and("have.text", "TThe months required field is required");

        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("updateOrganizationTitleMainScreen", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.boardsPopUpOkButton).click({multiple: true});
        cy.get(organization.scrumSign).click();
        cy.get(organization.editButton).eq(1).should("be.visible").click();
        cy.get(organization.titleField).eq(1).clear().type(lastName);
        cy.get(organization.checkMark).click();

        cy.get(organization.titleField).should("be.visible").and("contain", lastName);

        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();

        cy.get(organization.titleField).should("be.visible").and("not.contain", lastName);
    })

    it("updateOrganizationTitle50", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);

        cy.get(organization.titleField).eq(1).click();
        cy.get(organization.organizationSettings).eq(6).click();
        cy.get(organization.updateNameField).type(data.user.longTitle);
        cy.get(organization.updateButton).click({multiple:true});
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })
})