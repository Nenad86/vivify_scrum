import board from "../elements/boardElements"
import organization from "../elements/organizationElements"

class Board {
    createScrumBoard(name){
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
    }

    createKanbanBoard(name){
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
    }

    deleteBoard(name){
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).click({force: true});
        cy.get(board.deleteBoardButton).scrollIntoView().click();
        cy.get(board.saveButton).click();

        cy.get(board.addBoardField).should("not.contain", name);
    }

    cancelCreatingBoard(name){
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
    }

    changeBoardType(){
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).click();
        cy.get(board.boardTypeButton).scrollIntoView().click();
        cy.get(board.boardTypeChecbox).eq(1).click();
        cy.get(board.boardTypeChecbox).eq(0).click({force: true});
        cy.get(board.saveButton).should("be.visible").click();
    }

    updateBoardTitle(lastName){
        cy.get(board.boardList).click();
        cy.get(board.boardSettingsButton).click();
        cy.get(board.boardUpdateTitleField).clear().type(lastName);
        cy.get(board.updateBUtton).eq(0).click();

        cy.get(board.boardList).should("contain", lastName);
    }

    createBoardByTopButton(name){
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
    }

    createBoardSidebar(name){
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
    }
}

export default Board;