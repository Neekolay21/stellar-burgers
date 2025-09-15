import { selectors } from '../support/selectors';
import { TIngredient } from '../../src/utils/types';

describe('Проверка конструктора бургера', () => {
  let ingredientsData: TIngredient[];

  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    window.localStorage.setItem('refreshToken', 'refreshTokenMock');
    cy.setCookie('accessToken', 'mockedAccessToken');

    cy.visit('/');

    cy.wait('@getUser');
    cy.wait('@getIngredients');

    cy.fixture('ingredients.json').then((data: { data: TIngredient[]}) => {
      ingredientsData = data.data;

      const bun = ingredientsData.find((i) => i.type === 'bun') as TIngredient;
      cy.contains(bun.name).parents(selectors.ingredient).as('bun');
      cy.get('@bun').find('button', { timeout: 10000 }).should('exist').as('bunAddBtn');

      const filling = ingredientsData.find((i) => i.type === 'main') as TIngredient;
      cy.contains(filling.name).parents(selectors.ingredient).as('filling');
      cy.get('@filling').find('button', { timeout: 10000 }).should('exist').as('fillingAddBtn');

      const sauce = ingredientsData.find((i) => i.type === 'sauce') as TIngredient;
      cy.contains(sauce.name).parents(selectors.ingredient).as('sauce');
      cy.get('@sauce').find('button', { timeout: 10000 }).should('exist').as('sauceAddBtn');
    });
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('добавление ингредиента в конструктор', () => {
    cy.get('@bunAddBtn').click({ force: true });
    cy.get('@fillingAddBtn').click({ force: true });
    cy.get('@sauceAddBtn').click({ force: true });

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: any) => i.type === 'bun');
      const filling = data.data.find((i: any) => i.type === 'main');
      const sauce = data.data.find((i: any) => i.type === 'sauce');

      cy.get(selectors.constructorElement)
        .should('contain.text', bun.name)
        .and('contain.text', filling.name)
        .and('contain.text', sauce.name);
    });
  });

  it('закрытие модалки по крестику', () => {
    cy.get('@bun').find('a').click({ force: true });
    cy.get(selectors.modal, { timeout: 10000 }).should('exist');

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: any) => i.type === 'bun');

      cy.get(selectors.modal)
        .find(selectors.ingredientName)
        .should('have.text', bun.name);

      cy.get(selectors.modal).contains('Белки').next().should('have.text', bun.proteins.toString());
      cy.get(selectors.modal).contains('Жиры').next().should('have.text', bun.fat.toString());
      cy.get(selectors.modal).contains('Углеводы').next().should('have.text', bun.carbohydrates.toString());
    });

    cy.get(selectors.modalClose).click({ force: true });
    cy.wait(500);
    cy.get(selectors.modal, { timeout: 10000 }).should('not.exist');
  });

  it('закрытие модалки по оверлею', () => {
    cy.get('@filling').find('a').click({ force: true });
    cy.get(selectors.modalOverlay).should('exist');

    cy.fixture('ingredients.json').then((data) => {
      const filling = data.data.find((i: any) => i.type === 'main');

      cy.get(selectors.modal)
        .find(selectors.ingredientName)
        .should('have.text', filling.name);

      cy.get(selectors.modal).contains('Белки').next().should('have.text', filling.proteins.toString());
      cy.get(selectors.modal).contains('Жиры').next().should('have.text', filling.fat.toString());
      cy.get(selectors.modal).contains('Углеводы').next().should('have.text', filling.carbohydrates.toString());
    });

    cy.get(selectors.modalOverlay).click({ force: true });
    cy.get(selectors.modal).should('not.exist');
  });

  it('создание заказа', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.get('@bunAddBtn').click({ force: true });
    cy.get('@fillingAddBtn').click({ force: true });
    cy.get('@sauceAddBtn').click({ force: true });

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: any) => i.type === 'bun');
      const filling = data.data.find((i: any) => i.type === 'main');
      const sauce = data.data.find((i: any) => i.type === 'sauce');

      cy.get(selectors.constructorElement)
        .should('contain.text', bun.name)
        .and('contain.text', filling.name)
        .and('contain.text', sauce.name);
    });

    cy.contains('Оформить заказ').click({ force: true });
    cy.wait('@createOrder');

    cy.get(selectors.modal, { timeout: 10000 }).should('exist');
    cy.fixture('order.json').then((json) => {
      cy.get(selectors.orderNumber)
        .should('exist')
        .and('have.text', json.order.number.toString());
    });

    cy.get(selectors.modalClose).click({ force: true });
    cy.wait(500);
    cy.get(selectors.modal, { timeout: 10000 }).should('not.exist');
  });
});
