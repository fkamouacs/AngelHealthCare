
describe('usage test 1', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.viewport(2560, 1440);
        Cypress.env('DISABLE_WDS_OVERLAY', 'true');
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

      const findAllElementsInIframes = (element) => {
        return cy.get('iframe').then($iframes => {
          // Iterate over each iframe
          const inputsList = [];
          const iframePromises = $iframes.map((index, iframe) => {
            // Using Cypress to wrap the iframe's document body
            return cy.wrap(iframe.contentDocument.body).find(element).then($inputs => {
              // Iterate over found inputs and add them to the list
              $inputs.each((_, input) => {
                inputsList.push(input);
              });
            });
          });
      
          // Wait for all promises from each iframe to resolve
          return Cypress.Promise.all(iframePromises).then(() => {
            // Return the collected list of inputs
            return inputsList;
          });
        });
      };

    it('should check if "Angel Health Care" is visible to the user', () => {
        // Using `cy.contains()` to find an element containing the specific text
        cy.contains('Angel Health Care').should('be.visible');
    });

    it('login test and navigate different tabs and add a resource item', () => {
        // Find any button that contains the text "LOG IN"
        cy.get('button').contains('log in', {matchCase: false}).should('be.visible').click({ force: true });

        cy.get('input[type="email"]').should('be.visible').type("jr@gmail.com", { force: true });
        cy.get('input[type="password"]').should('be.visible').type("12345678", { force: true });

        cy.get('button').contains('login', {matchCase: false}).should('be.visible').click({ force: true });

        cy.get('button').contains('rooms', {matchCase: false}).should('be.visible').click({ force: true });
        cy.get('button').contains('resources', {matchCase: false}).should('be.visible').click({ force: true });
        cy.get('button').contains('processes', {matchCase: false}).should('be.visible').click({ force: true });
        cy.get('button').contains('accounts', {matchCase: false}).should('be.visible').click({ force: true });
        cy.get('button').contains('view messages', {matchCase: false}).should('be.visible').click({ force: true });

        // cy.get('button').contains('open drawer', {matchCase: false}).should('be.visible').click({ force: true });

        findElementInFrame('button', 'open drawer').should('be.visible').click({ force: true });

        findElementInFrame('.MuiDrawer-root > .MuiPaper-root','Add New Resource').should('be.visible');
        findElementInFrame('span','Add New Resource').should('be.visible').click({ force: true });

        const inputValues = ['mask', Math.floor(Math.random() * (100000 - 1000 + 1) + 1000), 'These are for staff memebers only!'];
        findAllElementsInIframes("input").each((element, index) => {
            // Use `cy.wrap()` to convert the yielded jQuery element back into a Cypress chainable object
            cy.wrap(element).type(inputValues[index], { force: true });
          });
          
        findElementInFrame('button', 'add resource').should('be.visible').click({ force: true });
        cy.get('button').contains('resources').should('be.visible').click({ force: true });
        cy.contains(inputValues[0]).should('exist');
        cy.contains(inputValues[1]).should('exist');
    });

});
