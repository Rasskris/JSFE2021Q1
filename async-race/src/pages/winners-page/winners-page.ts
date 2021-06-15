import './winners.scss';
import { renderWinnersCount, renderWinnersTableContent } from './renders';
import tableClickHandle from './handlers';
import { BaseComponent } from '../../components';
import { registerEvent } from '../../utils';
import { Loader, EventProvider } from '../../libs';

const elementName = 'section';
const className = 'winners-page';

export default class WinnersPage extends BaseComponent {
  loader: Loader;

  winnersTable: HTMLTableElement;

  constructor(loader: Loader, eventProvider: EventProvider) {
    super(elementName, className);

    this.loader = loader;

    this.winnersTable = document.createElement('table');

    this.registerEvent(eventProvider);
  }

  registerEvent(eventProvider: EventProvider) {
    const eventName = 'click';
    const customEventName = 'table-click';

    registerEvent(
      this.winnersTable, eventName, customEventName, tableClickHandle, eventProvider, this.loader,
    );
  }

  async renderWinnersPage(): Promise<WinnersPage> {
    const winnersContainer = document.createElement('div');
    const winnersCountWrapper = document.createElement('div');

    winnersContainer.classList.add('winners-container');
    winnersCountWrapper.classList.add('winners-count');
    this.winnersTable.classList.add('winners-table');

    winnersContainer.setAttribute('id', 'winners-container');
    winnersCountWrapper.setAttribute('id', 'winners-count');
    this.winnersTable.setAttribute('id', 'winners-table');

    winnersCountWrapper.innerHTML = renderWinnersCount();
    this.winnersTable.innerHTML = await renderWinnersTableContent(this.loader) as string;

    winnersContainer.append(winnersCountWrapper, this.winnersTable);
    this.element.append(winnersContainer);

    return this;
  }
}
