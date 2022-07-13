import data from '../fixtures/data.json'
import consoleColor from "../support/consoleColor"

module.exports = {
    get({token = "", statusCode = "", testName = ""}){
        return cy.request({
            failOnStatusCode: false,
            method: "GET",
            url: `${data.user.apiBaseUrl}/api/v2/boards`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
            ? consoleColor.log(`${testName} - - PASS`, "success") 
            : consoleColor.log(`${testName} - - FAIL \n ${JSON.stringify(response)}`, "error") 
            expect(response.status).to.eql(statusCode);
            return response.body
        })
    },
    post({name =  "", type = "", orgId = "", token =  "", statusCode = "", testName = "" }){
         return cy.request({
                failOnStatusCode: false,
                method: "POST",
                url: `${data.user.apiBaseUrl}/api/v2/boards`,
                body: {
                    configuration_board_id: null,
                    name: name,
                    organization_id: orgId,
                    team_members_board_id: null,
                    type: type
                  },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((response) => {
                typeof response.status !== "undefined" && response.status === statusCode
                ? consoleColor.log(`${testName} - - PASS`, "success") 
                : consoleColor.log(`${testName} - - FAIL \n ${JSON.stringify(response)}`, "error") 
                expect(response.status).to.eql(statusCode);
                return response.body
            })
    },
    put({code = "", name =  "", token =  "", statusCode = "", boardId = "", testName = "" }){
        return cy.request({
               failOnStatusCode: false,
               method: "PUT",
               url: `${data.user.apiBaseUrl}/api/v2/boards/${boardId}`,
               body: {
                   code: code,
                   name: name
               },
               headers: {
                   Authorization: `Bearer ${token}`,
               }
           }).then((response) => {
               typeof response.status !== "undefined" && response.status === statusCode
               ? consoleColor.log(`${testName} - - PASS`, "success") 
               : consoleColor.log(`${testName} - - FAIL \n ${JSON.stringify(response)}`, "error") 
               expect(response.status).to.eql(statusCode);
               return response.body
           })
   },
    delete({token = "", statusCode = "", testName = "", boardId = ""}){
        return cy.request({
            failOnStatusCode: false,
            method: "DELETE",
            url: `${data.user.apiBaseUrl}/api/v2/boards/${boardId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
            ? consoleColor.log(`${testName} - - PASS`, "success") 
            : consoleColor.log(`${testName} - - FAIL \n ${JSON.stringify(response)}`, "error") 
            expect(response.status).to.eql(statusCode);
            return response.body
        })
    }
} 