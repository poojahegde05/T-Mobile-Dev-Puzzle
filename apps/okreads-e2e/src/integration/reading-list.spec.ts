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
    cy.get('input[type="search"]').clear().type('bird');
    cy.get('form').submit();
    cy.get('[data-testing="button-search-item"]').click({ multiple: true, force: true });
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
    cy.contains('.mat-simple-snackbar', 'Bird by Bird added to your reading list!');
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
    cy.get('.mat-focus-indicator').click({ multiple: true, force: true });
    cy.get('[data-testing="reading-item"]').should('have.length.lessThan', 1);                                 
  });

  it('Then: I should be able to validate snackbar toast for undo book remove', () => {
    cy.get('input[type="search"]').clear().type('school');
    cy.get('form').submit();
    cy.get('[data-testing="button-search-item"]').click({ multiple: true, force: true });
    cy.contains('.mat-simple-snackbar', 'The School Book added to your reading list!')
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testing="button-read-item" ]').click({ multiple: true, force: true });
    cy.get('[data-testing="reading-item"]').should('have.length.lessThan', 1);
    cy.contains('.mat-simple-snackbar', 'The School Book removed from your reading list!')
    cy.get('.mat-focus-indicator').click({ multiple: true, force: true });
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
  
  });
});
