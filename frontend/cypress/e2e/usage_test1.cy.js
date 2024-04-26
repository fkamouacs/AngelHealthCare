
describe('usage test 1', () => {
    beforeEach(() => {
        cy.visit('https://angelhealthcare-6befd2c18f64.herokuapp.com/');
    });

    const wait = () => cy.wait(1000);

    it('login test and navigate different tabs and add a resource item', () => {

        cy.get('button').contains('log in', {matchCase: false}).click({ force: true });wait();

        cy.get('input[type="email"]').type("huifu.li@stonybrook.edu", { force: true });wait();
        cy.get('input[type="password"]').type("12345678", { force: true });wait();

        cy.get('button').contains('login', {matchCase: false}).click({ force: true });wait();

        cy.get('button').contains('rooms', {matchCase: false}).click({ force: true });wait();
        cy.get('button').contains('resources', {matchCase: false}).click({ force: true });wait();
        cy.get('button').contains('processes', {matchCase: false}).click({ force: true });wait();
        cy.get('button').contains('account', {matchCase: false}).click({ force: true });wait();
        cy.get('button').contains('view messages', {matchCase: false}).click({ force: true });wait();

        cy.get('button').contains('admintoolbar', {matchCase: false}).click({ force: true });wait();
        cy.get('span').contains('add new resource', {matchCase: false}).click({ force: true });wait();
        
        const inputValues = ['mask', Math.floor(Math.random() * (100000 - 1000 + 1) + 1000), 'These are for staff memebers only!'];
        cy.get('input').each((element, index) => {
            // Use `cy.wrap()` to convert the yielded jQuery element back into a Cypress chainable object
            cy.wrap(element).type(inputValues[index], { force: true });wait();
          });
          
        cy.get('button').contains('add resource', {matchCase: false}).click({ force: true });wait();
        cy.get('button').contains('resources', {matchCase: false}).click({ force: true });wait();
        cy.contains(inputValues[0]).should('exist');
        cy.contains(inputValues[1]).should('exist');

});
})
