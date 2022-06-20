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

    it("Cancel creating board", () => {
        board.cancelCreatingBoard(data.user.firstName);
    })

    it("create scrum board", () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/boards'
          }).as('addBoard');

        cy.createScrumBoardAndAssertNameUI(data.user.firstName);

        cy.wait('@addBoard').then(({ response }) => {
            expect(response.statusCode).eq(201);
            expect(response.body.name).eq(data.user.firstName);

        cy.deleteBoardUI(data.user.firstName);
        })
    })

    it("create kanban board", () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/boards'
          }).as('addBoard');

        cy.createKanbanBoardAndAssertNameUI(data.user.firstName);

        cy.wait('@addBoard').then(({ response }) => {
            expect(response.statusCode).eq(201);
            expect(response.body.name).eq(data.user.firstName);
        })

        cy.deleteBoardUI(data.user.firstName);
    })

    it("change board type", () => {
        cy.createKanbanBoardAndAssertNameUI(data.user.firstName);
        board.changeBoardType();
        cy.deleteBoardUI(data.user.firstName);
    })

    it("update board title", () => {
        cy.createKanbanBoardAndAssertNameUI(data.user.firstName);
        board.updateBoardTitle(data.user.lastName);
        cy.deleteBoardUI(data.user.lastName);
    })

    it("create board by button in top corner", () => {
        board.createBoardByTopButton(data.user.firstName);
        cy.deleteBoardUI(data.user.firstName);
    })

    it("create board from sidebar", () => {
        board.createBoardSidebar(data.user.firstName);
        cy.deleteBoardUI(data.user.firstName);
    })
})

