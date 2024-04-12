import Header from '../../src/components/header.jsx';

describe('Header Tests', () => {
    beforeEach(() => {
        cy.mount(<Header PAGES={{
            HOME : "HOME",
            LOGIN : "LOGIN",
           
            RESOURCES : "RESOURCES",
            ACCOUNTS : "ACCOUNTS",
            ADMINACCOUNTS : "ADMINACCOUNTS",
            PATIENTS : "PATIENTS",
            ROOMS : "ROOMS",
            PROCESSES : "PROCESSES",
            PROCEDURES : "PROCEDURES",
            FORGOTPASSWORD : "FORGOTPASSWORD",
            RESETPASSWORD : "RESETPASSWORD"
        }}/>)
        cy.viewport(1000, 1000)
    });
  
    it('check header for the buttons', () => {
        cy.get('button').contains('Accounts').should('be.visible');
        cy.get('button').contains('Resources').should('be.visible');
        cy.get('button').contains('Rooms').should('be.visible');
        cy.get('button').contains('Processes').should('be.visible');
    });

});