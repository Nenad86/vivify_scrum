import organization from "../elements/organizationElements"
import data from "../../fixtures/data.json"

class Organization {
    createOrganization(name){
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.nextButton).click();
        cy.get(organization.boardsPopUpOkButton).click({force: true});
        cy.get(organization.scrumSign).should("be.visible").click();

        cy.get(organization.titleField).should("be.visible").and("contain", name);
    }

    deleteOrganization(name){
        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).click();
        cy.get(organization.deleteOrganizationButton).scrollIntoView().click({force: true});
        cy.get(organization.passwordField).type(data.user.password);
        cy.get(organization.yesButton).click();
        cy.get(organization.titleField).should("be.visible").and("not.contain", name);
    }

    cancelCreatingOrganization(name){
        cy.get(organization.addOrganizationField).click();
        cy.get(organization.organizationNameField).type(name);
        cy.get(organization.nextButton).click();
        cy.get(organization.organizationXButton).eq(1).click();
    }

    updatingOrganizationTitle(lastName){
        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).click();
        cy.get(organization.updateNameField).clear().type(lastName);
        cy.get(organization.updateButton).eq(0).click();

        cy.get(organization.organizationList).eq(1).should("be.visible").and("contain", lastName);
    }

    updateOrganizationWorkingDays(){
        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).click();
        cy.get(organization.workingDaysCheckbox).eq(6).click();
    }

    updateOrganizationVacation(){
        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).click();
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
    }

    updateVactionDaysInvalid(){
        cy.get(organization.organizationList).eq(1).click();
        cy.get(organization.organizationSettings).click();
        cy.get(organization.vacationDaysField).clear().type("366");
        cy.get(organization.updateButton).eq(1).click();

        cy.get(organization.vacationValidationMessage).eq(1).scrollIntoView().should("be.visible").and("have.text", "The vacation days field must be between 0 and 365");
    }

    updateOrganizationTitleMainScreen(lastName){
        cy.get(organization.scrumSign).click();
        cy.get(organization.editButton).eq(1).should("be.visible").click();
        cy.get(organization.titleField).eq(1).clear().type(lastName);
        cy.get(organization.checkMark).click();

        cy.get(organization.titleField).should("be.visible").and("contain", lastName);
    }
}

export default Organization;