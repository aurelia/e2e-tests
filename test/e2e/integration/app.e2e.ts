describe('Aurelia navigation app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the page and display the initial page title', () => {
    cy.title().should('equal', 'Aurelia');
  });

  it('should display greeting', () => {
    cy.get('h1').contains('Hello World!');
  });
});
