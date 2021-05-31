import './header.scss';
import BaseComponent from '../base-component/base-component';
import Nav from '../nav/nav';
import Storage from '../../storage/storage';
import { registerEvent, createAvatar } from '../../utils';
import { EventProvider } from '../../libs';
import { handleBtnClick, handleLogout }  from '../../controllers';
import Button from '../../shared/button/button';
import BestScore from '../best-score/best-score';


export default class Header extends BaseComponent {
  readonly nav: Nav;
  
  registerBtn: Button;

  storage: Storage;

  bestScore: BestScore;

  constructor(eventProvider: EventProvider, storage: Storage, bestScore: BestScore) {
    super('header', ['header']);

    this.storage = storage;
    this.bestScore = bestScore;

    this.nav = new Nav();
    this.registerBtn = new Button('Register new player', 'btn-register')

    this.renderHeader();
    this.registrEvent(eventProvider);
  }
  
  registrEvent(eventProvider: EventProvider): void {
    registerEvent(this.element, 'click', 'btn-click', handleBtnClick, eventProvider);
  }

  renderHeader(): void {
    const headerBtn = this.registerBtn.element;
    headerBtn.classList.add('header__btn');
    
    const logoElement = document.createElement('a');
    logoElement.href = '#about';
    logoElement.className = 'header__logo';

    this.element.append(logoElement, this.nav.element);

    if (!localStorage.getItem('firstName')) {
      this.element.append(headerBtn);
    } else {
      const btnStart = document.createElement('a');
      btnStart.setAttribute('href', '#game');
      btnStart.classList.add('btn', 'header__btn', 'btn-start');
      btnStart.textContent = 'Start Game';

      const imgSrc = localStorage.getItem('avatar') as string;
      const avatar = createAvatar(imgSrc);
  
      avatar.addEventListener('click', () => {
        handleLogout();
      })

      this.element.append(btnStart, avatar);
    }
    
  }
}