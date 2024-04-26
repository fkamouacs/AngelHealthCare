
describe('usage test 1', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.viewport(2560, 1440);
    });

    const findElementInFrame = (elementType, searchText) => {
        return cy.get('iframe').then($iframes => {
          // Iterate over each iframe
          const iframeElements = [];
          $iframes.each((index, iframe) => {
            const $iframeBody = cy.wrap(iframe.contentDocument).find('body').should('not.be.undefined');
            iframeElements.push({ $iframeBody, iframe });
          });
          // Wait for all iframe bodies to resolve
          return Cypress.Promise.all(iframeElements.map(({ $iframeBody }) => $iframeBody)).then($iframeBodies => {
            for (let i = 0; i < $iframeBodies.length; i++) {
              const $iframeBody = $iframeBodies[i];
              if ($iframeBody) {
                const $element = $iframeBody.find(`${elementType}:contains("${searchText}")`, { matchCase: false });
                if ($element.length > 0) {
                  return { $element, iframe: iframeElements[i].iframe };
                }
              }
            }
            return null;
          });
        });
      };

    it('login test and navigate different tabs and add a resource item', () => {

        cy.contains('Angel Health Care').should('be.visible');wait();
        cy.get('button').contains('log in', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('input[type="email"]').should('be.visible').type("huifu.li@stonybrook.edu", { force: true });wait();
        cy.get('input[type="password"]').should('be.visible').type("12345678", { force: true });wait();

        cy.get('button').contains('login', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('button').contains('account', {matchCase: false}).should('be.visible').click({ force: true });wait();
        cy.get('button').contains('view messages', {matchCase: false}).should('be.visible').click({ force: true });wait();

        cy.get('input[name="receivers"]').type("huifu.li@stonybrook.edu");wait();
        cy.get('textarea[name="messageInput"]').type("fhuisdag");wait();
        
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
