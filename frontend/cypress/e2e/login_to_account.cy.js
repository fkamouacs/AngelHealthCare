describe('LoginPage to Account Page Tests', () => {

    beforeEach(() => {
        cy.visit('https://angelhealthcare-6befd2c18f64.herokuapp.com/');
    });

    it('Homepage to login page to account page to resource page', () => {
        cy.get('button').contains('Log in').click();
        cy.get('input[type="email"]').type('js@gmail.com');
        cy.get('input[type="password"]').type('12345678');
  
        cy.get('input[type="email"]').should('have.value', 'js@gmail.com');
        cy.get('input[type="password"]').should('have.value', '12345678');
        
        cy.get('button').contains('Login').click();
        cy.get('button').contains('Accounts').should('be.visible');

        cy.get('button').contains('Resources').click();
    });

});
