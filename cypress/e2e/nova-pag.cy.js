/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('/../../src/index.html');
    })

    it('testa a página da política de privavidade de forma independente', () => {
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click();
        cy.get('#white-background p').eq(0).contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
    })
  })
  