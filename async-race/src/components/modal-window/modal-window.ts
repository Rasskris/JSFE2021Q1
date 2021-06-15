import './modal-window.scss';
import { BaseComponent } from '../base-component';
import closeModalWindow from './handlers';

const elementName = 'div';
const className = 'modal';

export default class ModalWindow extends BaseComponent {
  constructor() {
    super(elementName, className);

    this.renderModalWindow();
  }

  renderModalWindow(): void {
    const wrapper = document.createElement('div');
    const contentOfWinner = document.createElement('div');
    const messageElement = document.createElement('p');
    const closeElement = document.createElement('span');

    closeElement.textContent = 'x';

    closeElement.addEventListener('click', closeModalWindow);

    messageElement.setAttribute('id', 'message');

    wrapper.classList.add('modal__wrapper');
    contentOfWinner.classList.add('content-winner');
    messageElement.classList.add('message');
    closeElement.classList.add('close');

    contentOfWinner.append(closeElement, messageElement);
    wrapper.append(contentOfWinner);
    this.element.append(wrapper);
  }
}
