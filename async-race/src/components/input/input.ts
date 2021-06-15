import { BaseComponent } from '../base-component';

export default class Input extends BaseComponent {
  constructor(type: string, name: string, className: string) {
    super('input', 'input');

    this.element.classList.add(className);

    this.element.setAttribute('type', type);
    this.element.setAttribute('name', name);
  }
}
