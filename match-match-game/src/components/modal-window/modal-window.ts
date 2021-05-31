import './modal-window.scss';
import BaseComponent from "../base-component/base-component";

export default class ModalWindow extends BaseComponent {
  constructor(content: HTMLElement) {
    super('div', ['modal']);

    this.renderModalWindow(content);
  }

  renderModalWindow(content: HTMLElement): void {
    const wrapper = document.createElement('div');
    wrapper.className = 'modal__wrapper';
    
    wrapper.appendChild(content);
    this.element.appendChild(wrapper);
  }
}