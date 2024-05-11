describe('LoginPage to Account Page Tests', () => {

    beforeEach(() => {
        cy.visit('https://angelhealthcare-6befd2c18f64.herokuapp.com/');
    });

    it('Homepage to login page to account page to resource page', () => {
        cy.get('button').contains('Log in').click();
        cy.get('input[type="email"]').type('wentao.he.1@stonybrook.edu');
        cy.get('input[type="password"]').type('5201314whe');
  
        cy.get('input[type="email"]').should('have.value', 'wentao.he.1@stonybrook.edu');
        cy.get('input[type="password"]').should('have.value', '5201314whe');
        
        cy.get('button').contains('Login').click();
        cy.get('button').contains('Account').should('be.visible');
    });

});
