import './user-field.scss';
import { Data } from "../../interfaces/storage";
// import User from "../../interfaces/user";
import BaseComponent from "../base-component/base-component";

export default class UserField extends BaseComponent {
  constructor(userData: Data) {
    super('div', ['user']);
    this.renderUserField(userData);
  }

  renderUserField({ firstName, lastName, email, avatar, score }: Data): void {
    const userTemplate = `
      <div class="user__data">
        <img class="user__img" src="${avatar}" title="Avatar">
        <div class="user__info">
          <p class="user__name">${firstName} ${lastName}</p>
          <p class="user__email">${email}</p>
        </div>
      </div>
      <div class="user__score">
        <p>Score: ${score}</p>
      </div>
    `;
    this.element.insertAdjacentHTML('beforeend', userTemplate);
  }
 }