// frontend/cypress/e2e/bug-tracker.cy.js
describe('Bug Tracker E2E Test', () => {
  it('should load the app, report a bug, and see it in the list', () => {
    // 1. Visit the app
    cy.visit('http://localhost:5173'); 

    // 2. Check initial state
    cy.contains('h1', 'Bug Tracker').should('be.visible');

    // 3. Find the form and type
    cy.get('input[id="title"]').type('E2E Test Bug');
    cy.get('textarea[id="description"]').type('This bug was created by Cypress');

    // 4. Submit the form
    cy.get('button[type="submit"]').click();

    // 5. Verify the bug is in the list
    cy.contains('h3', 'E2E Test Bug').should('be.visible');
    cy.contains('p', 'This bug was created by Cypress').should('be.visible');
    cy.contains('strong', 'Open').should('be.visible');
  });
});