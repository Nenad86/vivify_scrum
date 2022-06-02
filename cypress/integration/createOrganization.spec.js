import data from "../fixtures/data.json"
import Login from "../support/classes/login"
import Organization from "../support/classes/organization"

const organization = new Organization();
const login = new Login();

describe("createOrganization", () =>{

    beforeEach("visitUrl", () => {
        cy.visit("");
        login.loginFunction(data.user.email, data.user.password);
    })
    
    afterEach('Log out', () => {
        login.logOutFunction();
        login.loginButtonValidation();
    })

    it("cancel creating organization", () => {
        organization.cancelCreatingOrganization(data.user.firstName);
    })

    it("create organization", () => {
       organization.createOrganization(data.user.firstName);
       organization.deleteOrganization(data.user.firstName);
    })

    it("update organization title", () => {
        organization.createOrganization(data.user.firstName);
        organization.updatingOrganizationTitle(data.user.lastName);
        organization.deleteOrganization(data.user.lastName);
    })

    it("update organization working days", () => {
        organization.createOrganization(data.user.firstName);
        organization.updateOrganizationWorkingDays();
        organization.deleteOrganization(data.user.firstName);
    })

    it("update organization vacation days and months, leave empty fields", () => {
        organization.createOrganization(data.user.firstName);
        organization.updateOrganizationVacation();
        organization.deleteOrganization(data.user.firstName);
    })

    it("update organization vacation days, enter 366 days", () => {
        organization.createOrganization(data.user.firstName);
        organization.updateVactionDaysInvalid();
        organization.deleteOrganization(data.user.firstName);
    })

    it("update organization title on main screen", () => {
        organization.createOrganization(data.user.firstName);
        organization.updateOrganizationTitleMainScreen(data.user.lastName)
        organization.deleteOrganization(data.user.lastName);
    })

    it("update organization title, length of 50 characters", () => {
        organization.createOrganization(data.user.firstName);
        organization.updatingOrganizationTitle(data.user.longTitle)
        organization.deleteOrganization(data.user.firstName);
    }) 
    
    it("update organization title with only spaces", () => {
        organization.createOrganization(data.user.firstName);
        organization.updatingOrganizationTitle(data.user.onlySpaces);
        organization.deleteOrganization(data.user.firstName);
    })
})