import './button.scss';
import { BaseComponent } from '../../components';

export default class Button extends BaseComponent {
  constructor(textContent: string, className: string) {
    super('button', className);

    this.element.textContent = textContent;
    this.element.classList.add('btn');
  }
}
