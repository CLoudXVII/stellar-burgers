describe('Страница конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('Добавление булки в конструктор', () => {
    const bunName = 'Краторная булка N-200i';

    cy.get('[data-cy=constructor-bun-top]')
      .contains(bunName)
      .should('not.exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains(bunName)
      .should('not.exist');

    cy.get('[data-cy=ingredients-buns]').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-top]').contains(bunName).should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains(bunName)
      .should('exist');
  });

  it('Добавление основных и соусных ингредиентов в конструктор', () => {
    const mainName = 'Говяжий метеорит (отбивная)';
    const sauceName = 'Соус с шипами Антарианского плоскоходца';

    cy.get('[data-cy=constructor-ingredients]')
      .contains(mainName)
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains(sauceName)
      .should('not.exist');

    cy.get('[data-cy=ingredients-mains]')
      .contains(mainName)
      .next()
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains(mainName)
      .should('exist');

    cy.get('[data-cy=ingredients-sauces]')
      .contains(sauceName)
      .next()
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains(sauceName)
      .should('exist');
  });

  it('Создание полного бургера', () => {
    const bunName = 'Флюоресцентная булка R2-D3';
    const mainName = 'Мясо бессмертных моллюсков Protostomia';
    const sauceName = 'Соус традиционный галактический';

    cy.get('[data-cy=constructor-bun-top]')
      .contains(bunName)
      .should('not.exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains(bunName)
      .should('not.exist');

    cy.get('[data-cy=ingredients-buns]')
      .contains(bunName)
      .next()
      .contains('Добавить')
      .click();

    cy.get('[data-cy=constructor-bun-top]').contains(bunName).should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains(bunName)
      .should('exist');

    cy.get('[data-cy=constructor-ingredients]')
      .contains(mainName)
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains(sauceName)
      .should('not.exist');

    cy.get('[data-cy=ingredients-mains]')
      .contains(mainName)
      .next()
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains(mainName)
      .should('exist');

    cy.get('[data-cy=ingredients-sauces]')
      .contains(sauceName)
      .next()
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains(sauceName)
      .should('exist');
  });
});
