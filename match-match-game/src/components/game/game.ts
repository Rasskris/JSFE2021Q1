// import { random } from 'lodash';
import delay from '../../utils/delay/delay';
import BaseComponent from '../base-component/base-component';
import Card from '../card/card';
import CardsField from '../cards-field/cards-field';
import Congratulation from '../congratulation/congratulation';
import state from '../../state/state';
import Timer from '../timer/timer';
import Storage from '../../storage/storage';
import { checkEqualCards, calculateScore, openModalWindow, recordDataToBestScore } from '../../utils';
import BestScore from '../best-score/best-score';

const flipDelay = 2000;
let countCompare = 0;
let countWrongCompare = 0;

export default class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  timer: Timer;

  storage: Storage;

  bestScore: BestScore;

  constructor(timer: Timer, storage: Storage, bestScore: BestScore) {
    super();

    this.cardsField = new CardsField();
    this.timer = timer;
    this.storage = storage;
    this.bestScore = bestScore;

    this.element.append(this.timer.element, this.cardsField.element);
  }

  newGame(category: string, difficulty: number): void {
    this.cardsField.clearCardsField();

    const imgNames: string[] = [];
    for (let i = 1; i <= difficulty; i += 1) {
      imgNames.push(`${category}-${i}`);
    }
    
    const cards = imgNames
      .concat(imgNames)
      .map((imgName) => (new Card(category, imgName)))
      .sort(() => Math.round(Math.random() * difficulty));

    cards.forEach((card) => (
      card.element.addEventListener('click', () =>  this.cardHandler(card))
    ));

    this.cardsField.addCardsToField(cards);
  }

  startGame(): Game {
    const { category, difficulty } = state.gameSetting;
    this.newGame(category, Number(difficulty));
    this.timer.startCountdown();
    return this;
  }

  stopGame(): void {
    const seconds = this.timer.lastTime;
    const score = calculateScore(countCompare, countWrongCompare, seconds);
    state.score = score;
    const data = { id: localStorage.getItem('id'), score };

    this.storage.put(data, 'scores', 'readwrite');

    recordDataToBestScore(this.storage);

    const firstName = localStorage.getItem('firstName') as string;
    const congratulation = new Congratulation(firstName, (seconds / 60));

    const modalWrapper = document.querySelector('.modal__wrapper') as HTMLDivElement;
    modalWrapper.innerHTML = '';
    modalWrapper.appendChild(congratulation.element);
  
    this.timer.clearTimer();
    openModalWindow();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;

    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      // countCompare += 1;

      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.imgName !== card.imgName) {
      countWrongCompare += 1;

      this.activeCard.element.classList.add('no-equal');
      card.element.classList.add('no-equal');

      await delay(flipDelay);

      this.activeCard.element.classList.remove('no-equal');
      card.element.classList.remove('no-equal');

      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      countCompare += 1;
      this.activeCard.element.classList.add('equal');
      card.element.classList.add('equal');
    }

    const allCardsIsEqual = checkEqualCards();
    if (allCardsIsEqual) {
      this.stopGame();
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}