
describe('usage test 4', () => {
    beforeEach(() => {
        cy.visit('https://angelhealthcare-6befd2c18f64.herokuapp.com/');
    });

    const wait = () => cy.wait(1000);

    it('login test and navigate different tabs and add a resource item', () => {

        cy.contains('Angel Health Care').should('be.visible');wait();
        cy.get('button').contains('log in', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('input[type="email"]').should('be.visible').type("erenyeagerwhe@gmail.com", { force: true });
        cy.get('input[type="password"]').should('be.visible').type("123456789", { force: true });

        cy.get('button').contains('login', {matchCase: false}).should('be.visible').click({ force: true });

        cy.get('button').contains('account', {matchCase: false}).should('be.visible').click({ force: true });wait();
        
        cy.get('button').contains('admintoolbar', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('span').contains('add new room', {matchCase: false}).click({ force: true });wait();

        const inputValues = ['666', '30', '30', '66425a843932a98ca42b5dbc', '663fd691f03810ea03bec98c', 'test for room'];
        cy.get('input').each((element, index) => {
            // Use `cy.wrap()` to convert the yielded jQuery element back into a Cypress chainable object
            cy.wrap(element).type(inputValues[index], { force: true });wait();
          });
        
        cy.get('button').contains('add room', {matchCase: false}).click({ force: true });wait();
        cy.get('button').contains('rooms', {matchCase: false}).click({ force: true });wait();
        cy.contains('111').should('exist');

    });

});
