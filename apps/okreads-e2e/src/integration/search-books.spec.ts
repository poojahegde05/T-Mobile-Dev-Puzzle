describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  //xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  //});

  it('Then: I should be able to validate Want to Read button on book complete', () => {
    cy.get('input[type="search"]').clear().type('school');
    cy.get('form').submit();
    cy.get('[data-testing="button-search-item"]').should(
      'contain.name',
      'Want to Read'
    );
    cy.get('[data-testing="button-search-item"]').click({ multiple: true, force: true });
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testing="button-finish-item"]').click();
    cy.get('[data-testing="button-search-item"]').should(
      'contain.name',
      'Finished'
    );
  });

});
