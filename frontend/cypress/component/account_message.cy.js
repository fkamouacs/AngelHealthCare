import Messages from '../../src/components/account_message.jsx';

describe('Messages Tests', () => {

    beforeEach(() => {
        cy.mount(<Messages messages={[]} />);
        cy.viewport(1000, 1000);
    });

    it('check if message box exist', () => {
        cy.get('#message-box-title').should('exist');
        cy.get('#message-box').should('exist');
    });

});
