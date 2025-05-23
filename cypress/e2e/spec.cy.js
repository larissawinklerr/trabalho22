describe('Carrinho - Adição de Produto', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('Adiciona produto e verifica cookie, localStorage e persistência após recarregar', () => {
    cy.get('#btn-add').click();

    cy.getCookie('carrinho_token').should('exist').and('have.property', 'value', 'carrinho456');

    cy.window().then((win) => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.deep.equal(['Livro de Cypress']);
    });

    cy.reload();

    cy.get('#mensagem').should('contain', 'Carrinho com 1 item(ns).');
  });
});
