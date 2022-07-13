import data from "../../fixtures/data.json"
import user from '../../api/user'
import organization from "../../api/organization"
import boards from "../../api/board"

describe("APIB - Board CRUD", () =>{
    let token
    let boardData
    let allBoards
    let organizationData
    let allOrganizations
    
    before(() => {
        user.login({testName : Cypress.currentTest.title}).then((response) => {
            token = response.token
        }).then((response) => {
            organization.post({name: data.user.firstName, token: response.token, statusCode: 201, testName: Cypress.currentTest.title}).then((response) => {
                organizationData = response
            })
        }) 
    })

    after(() => {
        organization.get({token: token, statusCode: 200, testName: Cypress.currentTest.title
        }).then((response) => {
            allOrganizations = response;
        }).then((allOrganizations) => {
        allOrganizations.forEach((org) => {
            organization.delete({orgId: org.id, token: token, statusCode: 201, testName: Cypress.currentTest.title
                })
            })
        })
    })

    it("APIB- 01 - positive scrum", () => {
        boards.post({
            name: data.user.lastName,
            type: "scrum_board",
            orgId: organizationData.id,
            token: token,
            statusCode: 201,
            testName: Cypress.currentTest.title
        }).then((response) => {
            boardData = response
        })
    })

    it("APIB - 02 - get boards", () => {
        boards.get({
            token: token,
            statusCode: 200,
            testName: Cypress.currentTest.title
        }).then((response) => {
            allBoards = response;
        })  
    })

    it("APIB - 03 - name change", () => {
        allBoards.forEach((board) => {
        boards.put({
            code: board.code,
            name: "USPELO",
            boardId: board.id,
            token: token,
            statusCode: 200,
            testName: Cypress.currentTest.title
            })
        })
    })

    it("APIB - 04 - empty name", () => {
        allBoards.forEach((board) => {
        boards.put({
            code: board.code,
            name: "",
            boardId: board.id,
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
            })
        })
    })

    it("APIB - 05 - array", () => {
        allBoards.forEach((board) => {
        boards.put({
            code: board.code,
            name: [],
            boardId: board.id,
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
            })
        })
    })

    it("APIB - 06 - sql inject", () => {
        allBoards.forEach((board) => {
        boards.put({
            code: board.code,
            name: "{}$",
            boardId: board.id,
            token: token,
            statusCode: 400,
            testName: Cypress.currentTest.title
            })
        })
    })

    it("APIO - 07 - delete all boards", () => {
        allBoards.forEach((board) => {
            boards.delete({
                boardId: board.id,
                token: token,
                statusCode: 200,
                testName: Cypress.currentTest.title
            })
        })
    })
})