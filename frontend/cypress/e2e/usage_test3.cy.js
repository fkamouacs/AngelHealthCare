
describe('usage test 3', () => {
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
        cy.get('span').contains('add new patient', {matchCase: false}).click({ force: true });wait();

        const inputValues = ['good', 'girl', '123', '123-123-1234', '123-123-1234', 'NotAssigned'];
        cy.get('input').each((element, index) => {
            // Use `cy.wrap()` to convert the yielded jQuery element back into a Cypress chainable object
            cy.wrap(element).type(inputValues[index], { force: true });wait();
          });
        
        cy.get('button').contains('add patient', {matchCase: false}).click({ force: true });wait();
        cy.get('button').contains('rooms', {matchCase: false}).click({ force: true });wait();
        cy.contains('good girl').should('exist');

    });

});
