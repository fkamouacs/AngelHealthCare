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

    // it('should display user information', () => {
    //     cy.get('Typography').contains(mockUserInfo.username).should('be.visible');
    //     cy.get('Typography').contains(mockUserInfo.userId).should('be.visible');
    // });

    it('should have functional admin view and log out buttons', () => {
        cy.get('Button').contains('Admin accounts view').should('be.visible');
        cy.get('Button').contains('Log out').should('be.visible');
    });

    // it('should render MessageBox and NewMessageBox when View Messages is clicked', () => {
    //     cy.get('Button').contains('View Messages').click();
    //     // Add assertions to check if MessageBox and NewMessageBox are rendered
    // });

    // it('should render Schedule and NewScheduleBox when View Schedule is clicked', () => {
    //     cy.get('Button').contains('View Schedules').click();
    //     // Add assertions to check if Schedule and NewScheduleBox are rendered
    // });

    // Add any additional test cases as necessary
});
