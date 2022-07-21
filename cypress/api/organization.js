import data from '../fixtures/data.json'
import consoleColor from "../support/consoleColor"

module.exports = {
    get({token = "", statusCode = "", testName = ""}){
        return cy.request({
            failOnStatusCode: false,
            method: "GET",
            url: `${data.user.apiBaseUrl}/api/v2/my-organizations`,
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
    post({name =  "", token =  "", statusCode = "", testName = "" }){
         return cy.request({
                failOnStatusCode: false,
                method: "POST",
                url: `${data.user.apiBaseUrl}/api/v2/organizations`,
                body: {
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
    put({name =  "", token =  "", statusCode = "", orgId = "", testName = "" }){
        return cy.request({
               failOnStatusCode: false,
               method: "PUT",
               url: `${data.user.apiBaseUrl}/api/v2/organizations/${orgId}`,
               body: {
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
    delete({token = "", statusCode = "", testName = "", orgId = "", password = data.user.password}){
        return cy.request({
            failOnStatusCode: false,
            method: "POST",
            body: {
                passwordOrEmail: password,
            },
            url: `${data.user.apiBaseUrl}/api/v2/organizations/${orgId}`,
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