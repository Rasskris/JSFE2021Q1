import './main-page.scss';
import { BaseComponent } from '../../components';
import { Button } from '../../shared';
import { registerEvent } from '../../utils';
import { EventProvider, Loader } from '../../libs';
import paginationHandle from './handlers';

const txtContentBtnPrev = 'prev';
const txtContentBtnNext = 'next';

const classNameBtnPrev = 'btn-prev';
const classNameBtnNext = 'btn-next';

const elementName = 'main';
const className = 'main';

export default class MainPage extends BaseComponent {
  btnContainer: HTMLDivElement;

  btnPrev: Button;

  btnNext: Button;

  loader: Loader;

  constructor(loader: Loader, eventProvider: EventProvider) {
    super(elementName, className);

    this.btnContainer = document.createElement('div');

    this.btnPrev = new Button(txtContentBtnPrev, classNameBtnPrev);
    this.btnNext = new Button(txtContentBtnNext, classNameBtnNext);

    this.loader = loader;

    this.registerEvent(eventProvider);
  }

  registerEvent(eventProvider: EventProvider) {
    const eventName = 'click';
    const customEventName = 'pagination';

    registerEvent(
      this.btnContainer, eventName, customEventName, paginationHandle, eventProvider, this.loader,
    );
  }

  renderMainPage(): MainPage {
    this.btnContainer.classList.add('btn-conatiner');

    this.btnContainer.append(this.btnPrev.element, this.btnNext.element);

    this.element.append(this.btnContainer);

    return this;
  }
}
