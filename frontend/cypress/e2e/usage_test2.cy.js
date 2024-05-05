
describe('usage test 2', () => {
    beforeEach(() => {
        cy.visit('https://angelhealthcare-6befd2c18f64.herokuapp.com/');
    });

    const wait = () => cy.wait(1000);

    it('login test and navigate different tabs and add a resource item', () => {

        cy.contains('Angel Health Care').should('be.visible');wait();
        cy.get('button').contains('log in', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('input[type="email"]').should('be.visible').type("huifu.li@stonybrook.edu", { force: true });
        cy.get('input[type="password"]').should('be.visible').type("12345678", { force: true });

        cy.get('button').contains('login', {matchCase: false}).should('be.visible').click({ force: true });

        cy.get('button').contains('account', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('view messages', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('input[name="receivers"]').type("huifu.li@stonybrook.edu");wait();
        cy.get('textarea[name="titleInput"]').type("title 1");wait();
        cy.get('textarea[name="messageInput"]').type("message 1");wait();
        
        // cy.get('button').contains("send", {matchCase: false}).should('be.visible').click({ force: true });


        // no socket
        cy.get('button').contains('resources', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('account', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('view messages', {matchCase: false}).should('be.visible').click({ force: true });wait();
        // end

        cy.contains("wentao he", {matchCase: false}).click({ force: true });wait();
        cy.contains("hi message", {matchCase: false}).should('be.visible');


        // cy.contains("Accept", {matchCase: false}).should('be.visible').click({ force: true });

        cy.get('button').contains('resources', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('account', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('view schedule', {matchCase: false}).should('be.visible').click({ force: true });wait();




    });

});
