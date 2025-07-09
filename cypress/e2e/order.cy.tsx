describe('Оформление заказа', () => {
  const bunName = 'Краторная булка N-200i';
  const mainName = 'Биокотлета из марсианской Магнолии';
  const sauceName = 'Соус Spicy-X';

  const addIngredient = (sectionDataCy: string, ingredientName: string) => {
    cy.get(`[data-cy=${sectionDataCy}]`)
      .contains(ingredientName)
      .parent()
      .contains('Добавить')
      .click();
  };

  const assertIngredientInConstructor = (name: string, exists = true) => {
    const assertion = exists ? 'exist' : 'not.exist';
    cy.get('[data-cy=constructor-ingredients]')
      .contains(name)
      .should(assertion);
  };

  const assertBunInConstructor = (name: string, exists = true) => {
    const assertion = exists ? 'exist' : 'not.exist';
    cy.get('[data-cy=constructor-bun-top]').contains(name).should(assertion);
    cy.get('[data-cy=constructor-bun-bottom]').contains(name).should(assertion);
  };

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Собирает бургер и оформляет заказ', () => {
    addIngredient('ingredients-buns', bunName);
    assertBunInConstructor(bunName, true);

    addIngredient('ingredients-mains', mainName);
    assertIngredientInConstructor(mainName, true);

    addIngredient('ingredients-sauces', sauceName);
    assertIngredientInConstructor(sauceName, true);

    cy.get('[data-cy=order-button]').contains('Оформить заказ').click();

    cy.get('[data-cy=order-number]').contains('84005').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    assertBunInConstructor(bunName, false);
    assertIngredientInConstructor(mainName, false);
    assertIngredientInConstructor(sauceName, false);
  });
});
