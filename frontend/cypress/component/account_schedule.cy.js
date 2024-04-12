import Schedule from '../../src/components/account_schedule.jsx';

describe('Schedule Tests', () => {


    beforeEach(() => {
        cy.mount(<Schedule schedules={[]} />);
        cy.viewport(1000, 1000);
    });


    it('check if schdedule box exist', () => {
        cy.get('#schedule-box').should('exist');
    });

    it('check if two date input exist', () => {
        cy.get('#start-date-input').should('exist');
        cy.get('#end-date-input').should('exist');
    });



});
