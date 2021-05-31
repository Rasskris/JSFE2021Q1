import { Header, Game, AboutGame, Main, GameSettings, BestScore, ModalWindow, Form, Timer } from './components/index';
import { removeActiveNav, addActiveNav, recordDataToBestScore, changeBtnAtHeader, toggleDisHeaderItems } from './utils';
import { handleScoreLink } from './controllers';
import { Router, EventProvider } from './libs/index';
import Storage from './storage/storage';

interface MapPages {
  [key: string]: HTMLElement
}

export default class App {
  private readonly router: Router;

  private readonly eventProvider: EventProvider;
  
  private readonly header: Header
  
  private readonly main: Main;
  
  private readonly aboutGame: AboutGame;
  
  private readonly game: Game;

  private readonly registerFrom: Form;
  
  private readonly gameSettings: GameSettings;
  
  private readonly bestScore: BestScore;
  
  timer: Timer;

  storage: Storage;

  rootElement: HTMLElement;

  modalWindow: ModalWindow;

  constructor(rootElement: HTMLElement, router: Router, eventProvider: EventProvider, storage: Storage) {
    this.router = router;
    this.storage = storage;
    this.eventProvider = eventProvider;
    this.bestScore = new BestScore();
    this.header = new Header(eventProvider, this.storage, this.bestScore);
    this.main = new Main();
    this.aboutGame = new AboutGame();
    this.timer = new Timer();
    this.game = new Game(this.timer, this.storage, this.bestScore);
    this.gameSettings = new GameSettings(eventProvider);
    this.registerFrom = new Form(eventProvider, this.storage);
    this.modalWindow = new ModalWindow(this.registerFrom.element);
    this.rootElement = rootElement;
    this.rootElement.append(this.header.element, this.main.element, this.modalWindow.element);
  }

  init(): void {
    this.router.onRoutePatternMatched = this.onRoutePatternMatched.bind(this);
  }

  onRoutePatternMatched(target: string): void {
    this.renderPage(target);
  }

  renderPage(target: string): void {
    this.timer.clearTimer();
    let element;
    
    if (target === 'score') {
      recordDataToBestScore(this.storage);
      setTimeout(() => handleScoreLink(this.bestScore), 150);
    }

    removeActiveNav();
    addActiveNav(target);

    const mapPages: MapPages = {
      'about': this.aboutGame.element,
      'score': this.bestScore.element,
      'settings': this.gameSettings.element,
    };
    
    if (target === 'game') {
      element = this.game.startGame().element;
      changeBtnAtHeader('Stop Game');
      toggleDisHeaderItems();
    } else {
      element = mapPages[target];
    }

    this.main.element.innerHTML = '';
    this.main.renderMain(element);
  }

}