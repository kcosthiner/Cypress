/// <reference types="cypress"/>

beforeEach(() => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
})
describe('Validate login page', () => {
  
   it('Validate login with valid credentials', () => {
   cy.xpath('//input[@placeholder="Username"]').type('Admin')
   cy.xpath('//input[@placeholder="Password"]').type('admin123')
   cy.xpath('//button[normalize-space()="Login"]').click();
   cy.get('#app > div.oxd-layout > div.oxd-layout-navigation > header > div.oxd-topbar-header > div.oxd-topbar-header-userarea > ul > li > span > p')
   .should('have.text', 'Paul Collings')
   
   
  })
  
  it('Validate login with invalid credentials', () => {
    cy.xpath('//input[@placeholder="Username"]').type('Admin')
    cy.xpath('//input[@placeholder="Password"]').type('teste123')
    cy.xpath('//button[normalize-space()="Login"]').click();
    cy.get('.oxd-alert-content > .oxd-text')
   .should('have.class', 'oxd-text oxd-text--p oxd-alert-content-text')
   .and('contain.text', 'Invalid credentials')
  })

  it('Validate login with an emoji character', () => {
    cy.xpath('//input[@placeholder="Username"]').type('@@@@@##!"*🤣') 
    cy.xpath('//input[@placeholder="Password"]').type('@@@@@##!"*🤣')
    cy.xpath('//button[normalize-space()="Login"]').click();
    cy.get('.oxd-alert-content > .oxd-text')
   .should('have.class', 'oxd-text oxd-text--p oxd-alert-content-text')
   .and('contain.text', 'Unexpected error occurred')
  })

  it('Validate if the username is required', () => {
    cy.xpath('//input[@placeholder="Password"]').type('teste123')
    cy.xpath('//button[normalize-space()="Login"]').click();
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > span')
   .should('have.class', 'oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message')
   .and('contain.text', 'Required')
  })

  it('Validate if the password is required', () => {
    cy.xpath('//input[@placeholder="Username"]').type('Admin')
    cy.xpath('//button[normalize-space()="Login"]').click();
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > span')
   .should('have.class', 'oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message')
   .and('contain.text', 'Required')
  })

  it('Validate forgot your password', () => {
    cy.xpath('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[4]/p').click();
    cy.xpath('//input[@placeholder="Username"]').type("teste");
    cy.xpath('//button[@type="submit"]').click();
    cy.get('.oxd-text--h6')
   .should('have.class', 'oxd-text oxd-text--h6 orangehrm-forgot-password-title')
   .and('contain.text', 'Reset Password link sent successfully')
    
  })
  
})