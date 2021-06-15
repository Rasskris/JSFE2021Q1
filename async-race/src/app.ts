import { updateStoreForCars } from './store';
import { EventProvider, Loader } from './libs';
import { Header, ModalWindow } from './components';
import { MainPage, GaragePage, WinnersPage } from './pages';

export default class App {
  loader: Loader;

  eventProvider: EventProvider;

  rootElement: HTMLElement;

  header: Header;

  mainPage: MainPage;

  garagePage: GaragePage;

  winnersPage: WinnersPage;

  modalWindow: ModalWindow;

  constructor(rootElement: HTMLElement, loader: Loader, eventProvider: EventProvider) {
    this.loader = loader;

    this.eventProvider = eventProvider;

    this.rootElement = rootElement;

    this.header = new Header(this.loader, this.eventProvider);

    this.mainPage = new MainPage(this.loader, this.eventProvider);

    this.garagePage = new GaragePage(this.loader, this.eventProvider);

    this.winnersPage = new WinnersPage(this.loader, this.eventProvider);

    this.modalWindow = new ModalWindow();
  }

  init(): void {
    this.render();
  }

  async render(): Promise<void> {
    const mainPage = this.mainPage.renderMainPage().element;
    this.rootElement.append(this.header.element, mainPage, this.modalWindow.element);

    await updateStoreForCars(this.loader);

    const garagePage = this.garagePage.renderGaragePage().element;
    const winnersPage = await this.winnersPage.renderWinnersPage();

    mainPage.prepend(garagePage, winnersPage.element);
  }
}
