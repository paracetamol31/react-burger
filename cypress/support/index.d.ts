export { }
declare global {
  namespace Cypress {
    interface Chainable {
      testCard(cardName: string): Chainable<void>;
    }
  }
}