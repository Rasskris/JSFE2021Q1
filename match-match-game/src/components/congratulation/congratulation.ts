import { round } from 'lodash'
import './congratulation.scss';
import BaseComponent from "../base-component/base-component";
import { closeModalWindow, changeBtnAtHeader, toggleDisHeaderItems } from '../../utils';


export default class Congratulation extends BaseComponent {
  congratBtn: HTMLElement | null = null;

  constructor(userName: string, time: number) {
    super('div', ['congrat']);

    this.renderCongrat(userName, time);
  }

  renderCongrat(userName: string, time: number): void {
    const title = document.createElement('h4');
    title.classList.add('congrat__title');
    title.textContent = `Congratulations, ${userName}!`;

    const desc = document.createElement('p');
    desc.classList.add('congrat__desc');
    desc.textContent = `You successfully found all matches on ${round(time, 2)} minutes.`

    const btnOk = document.createElement('a');
    btnOk.classList.add('congrat__btn');
    btnOk.setAttribute('href', '#score');
    btnOk.textContent = 'OK'

    this.congratBtn = btnOk;
    this.element.append(title, desc, btnOk);

    // TODO: fix and redo
    btnOk.addEventListener('click', () => {
      changeBtnAtHeader('Start Game');
      toggleDisHeaderItems();
      // setTimeout(() => handleCongratBtn(bestScore), 100);
      closeModalWindow();
    });
  }
}