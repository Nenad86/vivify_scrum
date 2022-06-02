import data from "../fixtures/data.json"
import Login from "../support/classes/login"
import Organization from "../support/classes/organization"
import Board from "../support/classes/board"

const organization = new Organization();
const login = new Login();
const board = new Board();

describe("loginUser", () =>{

    beforeEach("visitUrl", () => {
        cy.visit("");
        login.loginFunction(data.user.email, data.user.password);
    })
    
    afterEach('Log out', () => {
        login.logOutFunction();
        login.loginButtonValidation();
    })

    it("cancel creating board", () => {
        board.cancelCreatingBoard(data.user.firstName);
    })

    it("create scrum board", () => {
        board.createScrumBoard(data.user.firstName);
        board.deleteBoard(data.user.firstName);
    })

    it("create kanban board", () => {
        board.createKanbanBoard(data.user.firstName);
        board.deleteBoard(data.user.firstName);
    })

    it("change board type", () => {
        board.createKanbanBoard(data.user.firstName);
        board.changeBoardType();
        board.deleteBoard(data.user.firstName);
    })

    it("update board title", () => {
        board.createKanbanBoard(data.user.firstName);
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