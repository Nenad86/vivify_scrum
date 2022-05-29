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
        cy.get(login.loginButton).should("have.css", "background-color", "rgb(78, 174, 147)").click(); 
        
        cy.get(login.loginButton).should("not.exist");   
    })

    afterEach('logOut', () => {
        cy.get(login.profileButton).click();

        cy.get(organization.titleField).should("not.exist");

        cy.get(login.settingsButton).click();
        cy.get(login.settingsButton).should("have.css", "background-color", "rgb(254, 87, 35)");
        cy.get(login.logOutButton).click();

        cy.get(login.loginButton).should('be.visible').and("contain", "Log In");
    })

    it("cancel creating organization", () => {
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.organizationXButton).eq(1).click();
    })

    it("create organization", () => {
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

    it("update organization title", () => {
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

    it("update organization title with only spaces", () => {
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

        cy.get(organization.nameValidationMessage).eq(0).scrollIntoView().should("be.visible").and("contain", "The name field is required");

        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("update organization working days", () => {
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

    it("update organization vacation days and months, leave empty fields", () => {
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
        cy.get(organization.vacationMonthsField).clear();
        cy.get(organization.additionalVacationDaysField).clear();
        cy.get(organization.updateButton).eq(1).click();

        cy.get(organization.vacationValidationMessage)
        .should("have.length", 5)
        .then(($child) => {
          expect($child[1].innerText).to.eq("The vacation days field is required");
          expect($child[2].innerText).to.eq("The months required field is required");
          expect($child[3].innerText).to.eq("The additional days field is required");
        });

        cy.get(organization.vacationValidationMessage).eq(1).scrollIntoView().should("be.visible").and("have.text", "The vacation days field is required");
        
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();

        cy.get(organization.titleField).should("be.visible").and("not.contain", name);
    })

    it("update organization vacation days, enter 366 days", () => {
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

        cy.get(organization.vacationValidationMessage).eq(1).scrollIntoView().should("be.visible").and("have.text", "The vacation days field must be between 0 and 365");
        
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click();
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
    })

    it("update organization title on main screen", () => {
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

    it("update organization title, length of 50 characters", () => {
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