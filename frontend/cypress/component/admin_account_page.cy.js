import AdminAccountPage from '../../src/components/admin_account_page.jsx';

describe('AdminAccountPage Tests', () => {
    beforeEach(() => {
        cy.mount(<AdminAccountPage />)
        cy.viewport(1000, 1000)
    });
  
    it('should render search, create account, and log out buttons', () => {
        cy.get('button').contains('Search').should('be.visible');
        cy.get('button').contains('Create Account').should('be.visible');
        cy.get('button').contains('Log out').should('be.visible');
    });

    // it('should open and close the Create Account modal', () => {
    //     cy.get('button').contains('Create Account').click();
    //     cy.get('button').contains('Create Account').should('be.visible');
    //     cy.get('button').contains('Create Account').click();
    //     cy.get('button').contains('Create Account').should('not.be.visible');
    // });

});