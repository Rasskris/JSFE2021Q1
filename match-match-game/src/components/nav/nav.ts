import './nav.scss';
import BaseComponent from '../base-component/base-component';


export default class Nav extends BaseComponent {
  constructor(){
    super('nav', ['nav']);
    this.renderNav();
  }

  renderNav(): void {
    const template = `
    <ul class="nav__list">
      <li class ="nav__item">
      <a href="#about" class="nav__link about"></a>
      </li>
      <li class ="nav__item">
      <a href="#score" class="nav__link score"></a>
      </li>
      <li class ="nav__item">
      <a href="#settings" class="nav__link settings"></a>
      </li>
    </ul>
    `;
    this.element.insertAdjacentHTML('afterbegin', template);
  }
}