import AccountPage from '../../src/components/account_page.jsx';

describe('AccountPage Tests', () => {
    const mockUserInfo = {
        username: 'testUser',
        userId: '123456',
        phone_number: '123-456-7890',
        status: 'Active',
        messages: [],
        schedules: []
    };

    beforeEach(() => {
        cy.mount(<AccountPage userInfo={mockUserInfo} />);
        cy.viewport(1000, 1000);
    });

    it('should have functional admin view and log out buttons', () => {
        cy.get('Button').contains('Admin accounts view').should('be.visible');
        cy.get('Button').contains('Log out').should('be.visible');
    });

    it('check if two buttons exist', () => {
        cy.get('#admin-account-view-button').should('exist');
        cy.get('#log-out-button').should('exist');
    });


});
