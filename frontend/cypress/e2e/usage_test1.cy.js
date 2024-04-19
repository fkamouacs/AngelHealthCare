
describe('usage test 1', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.viewport(1908,1080);
    });

    it('should check if "Angel Health Care" is visible to the user', () => {
        // Using `cy.contains()` to find an element containing the specific text
        cy.contains('Angel Health Care').should('be.visible');
    });

    it('login test and navigate different tabs and add a resource item', () => {
        // Find any button that contains the text "LOG IN"
        cy.get('button').contains('log in', {matchCase: false}).should('be.visible').click();

        cy.get('input[type="email"]').should('be.visible').type("jr@gmail.com");
        cy.get('input[type="password"]').should('be.visible').type("12345678");

        cy.get('button').contains('login', {matchCase: false}).should('be.visible').click();

        cy.get('button').contains('rooms', {matchCase: false}).should('be.visible').click();
        cy.get('button').contains('resources', {matchCase: false}).should('be.visible').click();
        cy.get('button').contains('processes', {matchCase: false}).should('be.visible').click();
        cy.get('button').contains('accounts', {matchCase: false}).should('be.visible').click();
        cy.get('button').contains('view messages', {matchCase: false}).should('be.visible').click();

        cy.get('button').contains('open drawer', {matchCase: false}).should('be.visible').click();
        cy.get('.MuiDrawer-root > .MuiPaper-root').contains('Add New Resource', {matchCase: false}).should('be.visible');
        cy.get('span').contains('Add New Resource', {matchCase: false}).should('be.visible').click();

        const inputValues = ['mask', Math.floor(Math.random() * (100000 - 1000 + 1) + 1000), 'These are for staff memebers only!'];
        cy.get('input').each((element, index) => {
            // Use `cy.wrap()` to convert the yielded jQuery element back into a Cypress chainable object
            cy.wrap(element).type(inputValues[index]);
          });
        cy.get('button').contains('add resource', {matchCase: false}).should('be.visible').click();
        cy.get('button').contains('resources', {matchCase: false}).should('be.visible').click();
        cy.contains(inputValues[0]).should('exist');
        cy.contains(inputValues[1]).should('exist');
    });

});
