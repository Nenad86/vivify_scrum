import login from "../pages/loginPage.json"
import data from "../fixtures/data.json"
import board from "../pages/boardPage.json"
import organization from "../pages/organizationPage.json"

describe("loginUser", () =>{

    const faker = require("faker");

    let name = faker.name.firstName();
    let lastName =faker.name.lastName();

    beforeEach("visitUrl", () => {
        cy.visit("");
        cy.get(login.emailInputField).type(data.user.email);
        cy.get(login.passwordInputField).type(data.user.password);
        cy.get(login.loginButton).click(); 
        cy.wait(3000); 
    })

    it("cancelCreatingBoard", ()=>{
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardField).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.cancelXButton).click();
    })

    it("createScrumBoardValid", ()=>{
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardField).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton, {timeout : 3000}).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();
    })

    it("createKanbanBoardValid", ()=>{
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardField).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.kanbanBoardButton).eq(1).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton, {timeout : 3000}).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();
    })

    it("changeBoardType", ()=>{
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardButton).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton, {timeout : 3000}).eq(8).click();
        cy.get(board.boardTypeButton).scrollIntoView().click();
        cy.get(board.boardTypeChecbox).eq(1).click();
        cy.get(board.saveButton).click();
        cy.get(board.deleteBoardButton, {timeout: 3000}).scrollIntoView().click();
        cy.get(board.saveButton).click();
    })

    it("updateBoardTitle", ()=>{
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardButton).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton, {timeout : 3000}).eq(8).click();
        cy.get(board.boardUpdateTitleField).type(lastName);
        cy.get(board.updateBUtton).eq(0).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();
    })

    it("createBoardByButton", ()=>{
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addBoardButton).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton, {timeout : 3000}).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();
    })

    it("createBoardSidebar", ()=>{
        cy.get(organization.organizationList).click();
        cy.get(board.xButton).click();
        cy.get(board.addButtonSidebar).click();
        cy.get(board.addBoardSidebar).click();
        cy.get(board.addBoardTitle).type(name);
        cy.get(board.nextButton).click();
        cy.get(board.scrumBoardButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click();
        cy.get(board.nextButton).click({force:true});
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton, {timeout : 3000}).eq(8).click();
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();
    })
})