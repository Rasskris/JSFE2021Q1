import './best-score.scss';
import UserField from "../user-field/user-field";
// import User from '../../interfaces/user';
import BaseComponent from '../base-component/base-component';
import { Data } from '../../interfaces/storage';


export default class BestScore extends BaseComponent {
  readonly title: string;

  constructor() {
    super('section', ['best-score']);
    this.title = 'Nobody has played yet. Be the first!';
    this.element.insertAdjacentHTML('afterbegin', this.title);
  }
  
  renderScores(usersData: Data[]): void {
    this.element.innerHTML = '';
    const usersFields = usersData.map((userData) => new UserField(userData).element )
    this.element.append(...usersFields);
  }
}