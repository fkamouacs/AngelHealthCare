import RoomsPage from '../../src/components/room_page.jsx';

describe('RoomsPage Tests', () => {
    beforeEach(() => {
        cy.mount(<RoomsPage />);
        cy.viewport(1000, 1000);
    });

    it('should render sort toggle buttons and search bar', () => {
        cy.get('#room-page-edit-patient-menu').should('not.be.visible');
        cy.get('#room-page-menu-button').click();
        cy.get('#room-page-edit-patient-menu').should('be.visible');
    });
});
