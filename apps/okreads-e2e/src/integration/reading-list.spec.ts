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

  it('Then: I should be able to validate Want to Read button on book complete', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    cy.get('#testbutton1').should(
      'contain.name',
      'Want to Read'
    );
    cy.get('#testbutton1').click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-item"]').should('have.length.greaterThan', 0);
    cy.get('#testbutton3').click();
    cy.get('#testbutton1').should(
      'contain.name',
      'Finished'
    );
  });

    it('Then: I should able to validate Want to Read button on book deletion', () => {
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('#testbutton2').click();
      cy.get('#testbutton1').should(
        'contain.name',
        'Want to Read'
      );
      cy.get('[data-testing="reading-item"]').should('have.length.lessThan', 1);
    });
  
  

});
