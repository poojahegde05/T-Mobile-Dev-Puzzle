describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to validate snackbar toast for undo book add', () => {
    cy.get('input[type="search"]').type('bird');
    cy.get('#testbutton1').click();
    cy.get('[data-testing="reading-list-container"]').should('have.length.greaterThan', 0);
    cy.contains('.mat-snack-bar-container', 'Book added')
    cy.get('.mat-focus-indicator').click({ multiple: true, force: true });
    cy.get('[data-testing="reading-item"]').should('have.length.lessThan', 1);
    
  });
  it('Then: I should be able to validate snackbar toast for undo book remove', () => {
    cy.get('input[type="search"]').type('school');
    cy.get('#testbutton1').click();
    cy.contains('.mat-snack-bar-container', 'Book added')
    cy.get('[data-testing="toggle-reading-list"]').click({ multiple: true});
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
    cy.get('#testbutton2').click({ multiple: true});
    cy.contains('.mat-snack-bar-container', 'Book removed')
    cy.get('.mat-focus-indicator').click({ multiple: true, force: true });
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
  });
});
