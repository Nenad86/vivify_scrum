import data from "../fixtures/data.json"
import Login from "../support/classes/login"
import Organization from "../support/classes/organization"

const organization = new Organization();
const login = new Login();

describe("createOrganization", () =>{

    beforeEach("visitUrl", () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v2/my-organizations'
          }).as('login');

        cy.visit("/");

        cy.loginViaUI();

        cy.wait('@login', {timeout: 10000}).then(({ response }) => {
            expect(response.statusCode).eq(200);
          });
    })
    
    afterEach('Log out', () => {
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

    it("cancel creating organization", () => {
        organization.cancelCreatingOrganization(data.user.firstName);
    })

    it("create organization", () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/organizations'
          }).as('addOrganization');

       cy.createOrganizationViaUI(data.user.firstName);

       cy.wait('@addOrganization').then(({ response }) => {
        expect(response.statusCode).eq(201);
        expect(response.body.name).eq(data.user.firstName);
        })

        cy.deleteOrganizationViaUI(data.user.firstName);
    })

    it("update organization title", () => {
        cy.createOrganizationViaUI(data.user.firstName);
        organization.updatingOrganizationTitle(data.user.lastName);
        cy.deleteOrganizationViaUI(data.user.lastName);
    })

    it("update organization working days", () => {
        cy.createOrganizationViaUI(data.user.firstName);
        organization.updateOrganizationWorkingDays();
        cy.deleteOrganizationViaUI(data.user.firstName);
    })

    it("update organization vacation days and months, leave empty fields", () => {
        cy.createOrganizationViaUI(data.user.firstName);
        organization.updateOrganizationVacation();
        cy.deleteOrganizationViaUI(data.user.firstName);
    })

    it("update organization vacation days, enter 366 days", () => {
        cy.createOrganizationViaUI(data.user.firstName);
        organization.updateVactionDaysInvalid();
        cy.deleteOrganizationViaUI(data.user.firstName);
    })

    it("update organization title on main screen", () => {
        cy.createOrganizationViaUI(data.user.firstName);
        organization.updateOrganizationTitleMainScreen(data.user.lastName)
        cy.deleteOrganizationViaUI(data.user.lastName);
    })

    it("update organization title, length of 50 characters", () => {
        cy.createOrganizationViaUI(data.user.firstName);
        organization.updatingOrganizationTitle(data.user.longTitle)
        cy.deleteOrganizationViaUI(data.user.firstName);
    }) 
    
    it("update organization title with only spaces", () => {
        cy.createOrganizationViaUI(data.user.firstName);
        organization.updatingOrganizationTitle(data.user.onlySpaces);
        cy.deleteOrganizationViaUI(data.user.firstName);
    })
})