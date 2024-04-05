import LoginPage from '../../src/components/login_page.jsx'
describe('LoginPage Tests', () => {
  beforeEach(() => {
      cy.mount(<LoginPage />)
      // cy.visit('/');
      cy.viewport(1000, 1000)
      cy.window().then((win) => {
          cy.spy(win.console, 'log').as('consoleLog');
      });
  });

  it('should render email and password fields', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should render login and forgot password buttons', () => {
      cy.get('button').contains('Login').should('be.visible');
      cy.get('button').contains('Forgot your password?').should('be.visible');
  });

  it('allows a user to type in email and password fields', () => {
      cy.get('input[type="email"]').type('testuser@example.com');
      cy.get('input[type="password"]').type('password');

      cy.get('input[type="email"]').should('have.value', 'testuser@example.com');
      cy.get('input[type="password"]').should('have.value', 'password');
  });

  it('check if login button is visible and not disabled', () => {
      cy.get('button').contains('Login').should('be.visible').and('not.be.disabled');
  });
});

