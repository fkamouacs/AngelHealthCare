import LoginPage from './component/login_page.js'
describe('LoginPage Tests', () => {
  beforeEach(() => {
      cy.mount(<LoginPage />)
      // cy.visit('/');
      cy.viewport(1000, 1000)
      cy.window().then((win) => {
          cy.spy(win.console, 'log').as('consoleLog');
      });
  });

  it('allows a user to type in username and password fields', () => {
      cy.get('input[id="username"]').type('testuser');
      cy.get('input[id="password"]').type('password');

      cy.get('input[id="username"]').should('have.value', 'testuser');
      cy.get('input[id="password"]').should('have.value', 'password');
  });

  it('navigates to home page on successful login', () => {
      cy.get('#login-button').should('be.visible');
      cy.get('#login-button').should('not.be.disabled');
      cy.get('#login-button').click();
      cy.get('@consoleLog').should('have.been.calledWith', "Button pressed");
  });
});

