import './card.scss';
import BaseComponent from '../base-component/base-component';

const flipClass = 'flipped';

export default class Card extends BaseComponent {

  isFlipped = false;

  imgName: string;

  constructor(category: string, imgName: string) {
    super('div', ['card-container']);

    this.imgName = imgName;

    this.renderCard(category, imgName);
  }

 flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(flipClass, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    })
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  renderCard(category: string, imgName: string): void {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card__front');
    cardFront.setAttribute('style', `background-image: url('images/${category}/${imgName}.png')`);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card__back')

    card.append(cardFront, cardBack);
    this.element.appendChild(card);
  }
}