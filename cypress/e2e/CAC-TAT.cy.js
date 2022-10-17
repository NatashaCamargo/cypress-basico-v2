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

  })
  