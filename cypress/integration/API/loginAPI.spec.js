import data from "../../fixtures/data.json"
import user from '../../api/user'

describe("loginUser", () =>{
    let token
    it('APIL - 01 - user login - positiv flow', () => {
        user.login({testName : Cypress.currentTest.title}).then((response) => {
            token = response.token
        })
    })

    it('APIL - 02 - user login - negativ flow - wrong email', () => {
        user.login({email: data.user.emailWithoutCom, statusCode : 401,
        testName: Cypress.currentTest.title }) 
    })

    it('APIL - 03 - user login - negativ flow - wrong password', () => {
        user.login({password: data.user.string, statusCode : 401 ,
        testName: Cypress.currentTest.title
        }) 
    })
})