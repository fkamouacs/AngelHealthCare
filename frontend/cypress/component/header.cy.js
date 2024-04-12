import Header from '../../src/components/header.jsx';

describe('Header Tests', () => {
    beforeEach(() => {
        cy.mount(<Header />)
        cy.viewport(1000, 1000)
    });
  
    it('check header for the buttons', () => {
        cy.get('button').contains('ACCOUNTS').should('be.visible');
        cy.get('button').contains('RESOURCES').should('be.visible');
        cy.get('button').contains('ROOMS').should('be.visible');
        cy.get('button').contains('PROCESSES').should('be.visible');
    });

});