import './main.scss';
import BaseComponent from "../base-component/base-component";


export default class Main extends BaseComponent {
  constructor() {
    super('main', ['main']);
  }
  
  renderMain(content: HTMLElement): void {
    this.element.append(content);
  }
}