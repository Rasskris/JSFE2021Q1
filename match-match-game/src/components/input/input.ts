import './input.scss';
import BaseComponent from "../base-component/base-component";

export default class Input extends BaseComponent {
  constructor(type: string, placeholder: string, name: string) {
    super('input', ['input']);
    this.element.setAttribute('type', type);
    this.element.setAttribute('placeholder', placeholder);
    this.element.setAttribute('name', name);
    this.element.setAttribute('required', '');
    this.element.setAttribute('maxlength', '30');
  }
}