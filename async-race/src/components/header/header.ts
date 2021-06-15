import './header.scss';
import { Button } from '../../shared';
import { BaseComponent } from '../base-component';
import switchPageHandle from './handlers';
import { registerEvent } from '../../utils';
import { EventProvider, Loader } from '../../libs';

const textBtnGarage = 'to garage';
const textBtnWinners = 'to winners';

const classNameBtnGarage = 'btn-garage';
const classNameBtnWinners = 'btn-winners';

const elementName = 'header';
const className = 'header';

export default class Header extends BaseComponent {
  loader: Loader;

  btnGarage: Button;

  btnWinners: Button;

  constructor(loader: Loader, eventProvider: EventProvider) {
    super(elementName, className);

    this.loader = loader;

    this.btnGarage = new Button(textBtnGarage, classNameBtnGarage);
    this.btnWinners = new Button(textBtnWinners, classNameBtnWinners);

    this.renderHeader();

    this.registerEvent(eventProvider);
  }

  registerEvent(eventProvider: EventProvider): void {
    const eventName = 'click';
    const customEventName = 'switch-page';

    registerEvent(
      this.element, eventName, customEventName, switchPageHandle, eventProvider, this.loader,
    );
  }

  renderHeader() {
    this.btnGarage.element.setAttribute('disabled', '');

    this.element.append(this.btnGarage.element, this.btnWinners.element);
  }
}
