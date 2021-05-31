import './button.scss';
import BaseComponent from "../../components/base-component/base-component";

export default class Button extends BaseComponent {
  constructor(text: string, className: string) {
    super('button', ['btn']);
    this.element.textContent = text;
    this.element.classList.add(className);
  }
}