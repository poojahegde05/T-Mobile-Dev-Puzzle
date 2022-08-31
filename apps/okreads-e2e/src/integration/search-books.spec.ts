describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form')

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should be able to search books by title as I type', () => {
    cy.get('input[type="search"]').type('ja');
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    

  });
  
});
