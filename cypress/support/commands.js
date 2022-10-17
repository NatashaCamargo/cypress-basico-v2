Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type('Natasha');
        cy.get('#lastName').type('Camargo de Araujo');
        cy.get('#email').type('natashacamargodearaujo@venustechstudio.com');
        cy.get('#open-text-area').type('O que isso esta tentando me ensinar?', {delay: 0});
        cy.get('.button').contains('Enviar').click();
})