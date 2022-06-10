import data from "../fixtures/data.json"
import Login from "../support/classes/login"
import Organization from "../support/classes/organization"
import Board from "../support/classes/board"

const organization = new Organization();
const login = new Login();
const board = new Board();

describe("loginUser", () =>{

    beforeEach("visitUrl", () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v2/my-organizations'
          }).as('login');

        cy.visit("/login");
        login.loginFunction(data.user.email, data.user.password);

        cy.wait('@login', {timeout: 10000}).then(({ response }) => {
            expect(response.statusCode).eq(200);
          });
    })
    
    afterEach('Log out', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/logout'
        }).as('logout');

        login.logOutFunction();

        cy.wait('@logout').then(({response}) => {
            expect(response.statusCode).eq(201);
        })

        login.loginButtonValidation();
    })

    it("Cancel creating board", () => {
        board.cancelCreatingBoard(data.user.firstName);
    })

    it("create scrum board", () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/boards'
          }).as('addBoard');

        board.createScrumBoardAndAssertName(data.user.firstName);

        cy.wait('@addBoard').then(({ response }) => {
            expect(response.statusCode).eq(201);
            expect(response.body.name).eq(data.user.firstName);

        board.deleteBoard(data.user.firstName);
        })
    })

    it("create kanban board", () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/boards'
          }).as('addBoard');

        board.createKanbanBoardAndAssertName(data.user.firstName);

        cy.wait('@addBoard').then(({ response }) => {
            expect(response.statusCode).eq(201);
            expect(response.body.name).eq(data.user.firstName);
        })

        board.deleteBoard(data.user.firstName);
    })

    it("change board type", () => {
        board.createKanbanBoardAndAssertName(data.user.firstName);
        board.changeBoardType();
        board.deleteBoard(data.user.firstName);
    })

    it("update board title", () => {
        board.createKanbanBoardAndAssertName(data.user.firstName);
        board.updateBoardTitle(data.user.lastName);
        board.deleteBoard(data.user.lastName);
    })

    it("create board by button in top corner", () => {
        board.createBoardByTopButton(data.user.firstName);
        board.deleteBoard(data.user.firstName);
    })

    it("create board from sidebar", () => {
        board.createBoardSidebar(data.user.firstName);
        board.deleteBoard(data.user.firstName);
    })
})

