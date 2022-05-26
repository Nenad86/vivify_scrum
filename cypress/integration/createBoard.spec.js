import login from "../pages/loginPage.json"
import data from "../fixtures/data.json"
import board from "../pages/boardPage.json"
import organization from "../pages/organizationPage.json"

describe("loginUser", () =>{

    const faker = require("faker");

    const name = faker.name.firstName();
    const lastName =faker.name.lastName();

    beforeEach("visitUrl", () => {
        cy.visit("");
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click(); 
        
        cy.get(login.loginButton).should("not.exist");
    })

    afterEach('logOut', () => {
        cy.get(login.profileButton).should("be.visible").click();
        cy.get(login.settingsButton).click();
        cy.get(login.logOutButton).click();

        cy.get(login.loginButton).should('be.visible').and("contain", "Log In");
    })

    it("cancelCreatingBoard", () => {
        cy.get(organization.organizationList).should("be.visible").click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardField).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.cancelXButton).click();

        cy.get(board.addBoardField).should("be.visible").and("have.text", " Add new Board");
    })

    it("createScrumBoardValid", () => {
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardField).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();

        cy.get(board.boardList).should("be.visible").and("have.text", name);

        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();

        cy.get(board.addBoardField).should("not.contain", name);
    })

    it("createKanbanBoardValid", () => {
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardField).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.kanbanBoardButton).eq(1).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});

        cy.get(board.boardList).should("be.visible").and("have.text", name);

        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();

        cy.get(board.addBoardField).should("not.contain", name);
    })

    it("changeBoardType", () => {
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardButton).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});

        cy.get(board.boardList).should("be.visible").and("have.text", name);

        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).eq(8).click();
        cy.get(board.boardTypeButton).scrollIntoView().click();
        cy.get(board.boardTypeChecbox).eq(1).click();
        cy.get(board.saveButton).click();
        cy.get(board.boardSettingsButton).eq(8).should("be.visible").click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();

        cy.get(board.addBoardField).should("be.visible").and("have.text", " Add new Board");
    })

    it("updateBoardTitle", () => {
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardButton).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});

        cy.get(board.boardList).should("be.visible").and("have.text", name);

        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).eq(8).click();
        cy.get(board.boardUpdateTitleField).type(lastName);
        cy.get(board.updateBUtton).eq(0).click();

        cy.get(board.boardList).should("contain", lastName)

        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();

        cy.get(board.addBoardField).should("be.visible").and("have.text", " Add new Board");
    })

    it("createBoardByButton", () => {
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardButton).should("be.visible").click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});

        cy.get(board.boardList).should("be.visible").and("have.text", name);

        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();

        cy.get(board.addBoardField).should("be.visible").and("have.text", " Add new Board");
    })

    it("createBoardSidebar", () => {
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addButtonSidebar).click();
        cy.get(board.addBoardSidebar).should("be.visible").click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});

        cy.get(board.boardList).should("be.visible").and("have.text", name);

        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();

        cy.get(board.addBoardField).should("be.visible").and("have.text", " Add new Board");
    })
})