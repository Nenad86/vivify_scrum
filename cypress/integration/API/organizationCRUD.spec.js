import data from "../../fixtures/data.json"
import user from '../../api/user'
import organization from "../../api/organization"

describe("APIO - Organization CRUD", () =>{
    let token
    let organizationData
    let allOrganizations
    before(() => {
        user.login({testName : Cypress.currentTest.title}).then((response) => {
            token = response.token
        })
    })

    it("APIO - 01 - positive", () => {
        organization.post({
            name: "new",
            token: token,
            statusCode: 201,
            testName: Cypress.currentTest.title
        }).then((response) => {
            organizationData = response
        })
    })

    it("APIO - 02 - get organization", () => {
        organization.get({
            token: token,
            statusCode: 200,
            testName: Cypress.currentTest.title
        }).then((response) => {
            organizationData = response;
        })
    })

    it("APIO - 03 - name change", () => {
        organizationData.forEach((org) => {
        organization.put({
            name: "update",
            orgId: org.id,
            token: token,
            statusCode: 200,
            testName: Cypress.currentTest.title
            })
        })
    })

    it("APIO - 04 - empty name", () => {
        organization.post({
            name: "",
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
        })
    })

    it("APIO - 05 - object", () => {
        organization.post({
            name: {},
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
        })
    })

    it("APIO - 06 - array", () => {
        organization.post({
            name: [],
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
        })
    })

    it("APIO - 07 - sql inject", () => {
        organization.post({
            name: "{}$",
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
        })
    })

    it("APIO - 08 - sql inject 2", () => {
        organization.post({
            name: "````",
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
        })
    })

    it("APIO - 09 - white space", () => {
        organization.post({
            name: "     ",
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
        })
    })

    it("APIO - 10 - get organizations", () => {
        organization.get({
            token: token,
            statusCode: 200,
            testName: Cypress.currentTest.title
        }).then((response) => {
            allOrganizations = response;
        })
    })

    it("APIO - 11 - delete all org", () => {
        allOrganizations.forEach((org) => {
            organization.delete({
                orgId: org.id,
                token: token,
                statusCode: 201,
                testName: Cypress.currentTest.title
            })
        })
    })
})