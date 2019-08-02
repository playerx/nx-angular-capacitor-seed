import { getGreeting } from '../support/app.po';

describe('nx-angular-capacitor-seed', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to nx-angular-capacitor-seed!');
  });
});
