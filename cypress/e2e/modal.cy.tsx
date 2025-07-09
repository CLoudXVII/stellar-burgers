describe('Модальное окно ингредиента', () => {
  const openIngredientModal = (name: string) => {
    cy.get('[data-cy=ingredients-buns]').contains(name).click();
    cy.get('[data-cy=modal]').contains(name).should('exist');
  };

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('Открытие кликом на ингредиент', () => {
    openIngredientModal('Краторная булка N-200i');
  });

  it('Закрытие кликом на крестик', () => {
    openIngredientModal('Краторная булка N-200i');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Закрытие кликом на оверлей', () => {
    openIngredientModal('Флюоресцентная булка R2-D3');

    cy.get('[data-cy=modal-overlay]').click('topRight', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
