import './timer.scss';
import BaseComponent from "../base-component/base-component";

let min = 0;
let sec = 0
let counter = 0;
let secOfCountdown = 16;

const countSecInMin = 60;

export default class Timer extends BaseComponent {

  timerId: NodeJS.Timeout | null =  null;

  lastTime: number;

  constructor() {
    super('div', ['timer']);

    this.lastTime = 0;
  }

  startTimer(): void {
    this.element.classList.remove('countdown');
    this.renderTimer();
    this.timerId = setInterval(() => this.renderTimer(), 1000)
  }

  startCountdown(): void {
    this.element.classList.add('countdown');
    this.renderCountdown();
    this.timerId = setInterval(() => this.renderCountdown(), 1000);
  }

  clearTimer(): void {
    min = 0;
    sec = 0;
    this.lastTime = 0;
    secOfCountdown = 16;

    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  renderCountdown(): void {
    secOfCountdown -= 1;
  
    if (secOfCountdown < 0) {
      this.clearTimer();
      this.startTimer();
      return;
    }

    const showSec = secOfCountdown < 10 ? `0${secOfCountdown}` : `${secOfCountdown}`;
    const timerElements = `
      <span>00:</span>
      <span>${showSec}</span>
    `;
    this.element.innerHTML = timerElements;
  } 

  renderTimer(): void {
    counter += 1;
    this.lastTime = counter;

    sec += 1;
    if (sec % countSecInMin === 0) {
      min += 1;
      sec = 0;
    }
    const showMin = min < 10 ? `0${min}` : `${min}`;
    const showSec = sec < 10 ? `0${sec}` : `${sec}`;
    const timerElements = `
      <span>${showMin}:</span>
      <span>${showSec}</span>
    `;
    this.element.innerHTML = timerElements;
  }
}