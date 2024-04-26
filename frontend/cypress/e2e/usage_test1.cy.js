
describe('usage test 1', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.viewport(2560, 1440);
    });

    const wait = () => {cy.wait(1000);
      };

    it('login test and navigate different tabs and add a resource item', () => {

        cy.contains('Angel Health Care').should('be.visible');cy.wait(100);wait();
        cy.get('button').contains('log in', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('input[type="email"]').should('be.visible').type("huifu.li@stonybrook.edu", { force: true });wait();
        cy.get('input[type="password"]').should('be.visible').type("12345678", { force: true });wait();

        cy.get('button').contains('login', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('button').contains('rooms', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('resources', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('processes', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('account', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('view messages', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('button').contains('admintoolbar', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('span').contains('add new resource', {matchCase: false}).should('be.visible').click({ force: true });wait();
        
        const inputValues = ['mask', Math.floor(Math.random() * (100000 - 1000 + 1) + 1000), 'These are for staff memebers only!'];
        cy.get('input').each((element, index) => {
            // Use `cy.wrap()` to convert the yielded jQuery element back into a Cypress chainable object
            cy.wrap(element).type(inputValues[index], { force: true });wait();
          });
          
        cy.get('button').contains('add resource', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('resources', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.contains(inputValues[0]).should('exist');
        cy.contains(inputValues[1]).should('exist');

});
