import './cards-field.scss';
import BaseComponent from "../base-component/base-component";
import Card from '../card/card';

const SHOW_TIME = 16;

export default class CardsField extends BaseComponent {
private cards: Card[] = [];

  constructor() {
    super('section', ['cards-field']);
  }

  addCardsToField(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => {
      this.element.appendChild(card.element);
    });

    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }

  clearCardsField(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }
}