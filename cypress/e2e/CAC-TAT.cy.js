/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('/../../src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Natasha');
        cy.get('#lastName').type('Camargo de Araujo');
        cy.get('#email').type('natashacamargodearaujo@venustechstudio.com');
        cy.get('#open-text-area').type('O que isso esta tentando me ensinar?', {delay: 0});
        cy.get('.button').contains('Enviar').click();

        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Natasha');
        cy.get('#lastName').type('Camargo de Araujo');
        cy.get('#email').type('natashacamargodearaujo.com');
        cy.get('#open-text-area').type('O que isso esta tentando me ensinar?', {delay: 0});
        cy.get('.button').contains('Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('campo telefonico continua vazio quando preenchid com valor nao numerico', () => {
        cy.get('#phone').type('abnxvwhgeby').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Natasha');
        cy.get('#lastName').type('Camargo de Araujo');
        cy.get('#email').type('natashacamargodearaujo.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('O que isso esta tentando me ensinar?', {delay: 0});
        cy.get('.button').contains('Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Natasha').clear();
        cy.get('#lastName').type('Camargo de Araujo').clear();
        cy.get('#email').type('natashacamargodearaujo.com').clear();
        cy.get('#phone').type('abnxvwhgeby').clear();
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').contains('Enviar').click();

        cy.get('.error').should('be.visible');
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success').should('be.visible');
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube');
    });

    // it.only roda apenas esse teste
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check();
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(($radio) => {
            cy.wrap($radio)
              .check()
              .should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Natasha').clear();
        cy.get('#lastName').type('Camargo de Araujo').clear();
        cy.get('#email').type('natashacamargodearaujo.com').clear();

        cy.get('#phone-checkbox')
          .check()
          .should('be.checked');

          cy.get('.button').contains('Enviar').click();
        
        cy.get('.error').should('be.visible');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
          .should('not.have.value' )
          .selectFile('cypress/fixtures/example.json')
          .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json');
          });
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
          .should('not.have.value' )
          .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
          .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json');
          });
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        // give an alias to example.json
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .should('not.have.value' )
          .selectFile('@sampleFile', { action: 'drag-drop'})
          .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json');
          });
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank');
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click();
    })

    it('testa a página da política de privavidade de forma independente', () => {
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click();
        cy.get('#white-background p').eq(0).contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
    })

    it.only('exibe mensagem por 3 segundos', () => {

        cy.get('#firstName').type('Natasha');
        cy.get('#lastName').type('Camargo de Araujo');
        cy.get('#email').type('natashacamargodearaujo@venustechstudio.com');
        cy.get('#open-text-area').type('O que isso esta tentando me ensinar?', {delay: 0});
        cy.get('.button').contains('Enviar').click();

        cy.clock(); // congela o relogio do navegador

        cy.get('.success').should('be.visible'); // verificação de que a mensagem está visível

        cy.tick(3000); // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.

        cy.get('span[style="display: none;"]').should('not.be.visible'); // verificação de que a mensagem não está mais visível
        
    })
  })
  