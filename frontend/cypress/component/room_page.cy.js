import RoomsPage from '../../src/components/room_page.jsx';

describe('RoomsPage Tests', () => {
    beforeEach(() => {
        cy.mount(<RoomsPage />);
        cy.viewport(1000, 1000);
    });
    

  it('should have toggle buttons for rooms and patients', () => {
      cy.get("#sort-by-room-button").contains('Rooms').should('be.visible');
      cy.get("#sort-by-patient-button").contains('Patients').should('be.visible');
  });

});
