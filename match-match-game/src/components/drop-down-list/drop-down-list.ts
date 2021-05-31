import './drop-down-list.scss';
import DataItem from '../../interfaces/data-item';
import BaseComponent from '../base-component/base-component';

export default class DropDownList extends BaseComponent {
  constructor(settingType: string, dataList: DataItem[]) {
    super('ul', ['drop-down-list', 'list']);

    this.element.dataset.setting = settingType;
    this.renderList(dataList);
  }

  renderList(data: DataItem[]): void {
    data.forEach(({settingData, nameItemList, imgName}) => {
    const itemTemplate =  `
      <li class="list__item" data-item-name="${settingData}">
        <p class="list__item-name">${nameItemList}</p>
        <img class="list__item-img" src="assets/icons/${imgName}.png">
      </li>
    `;

    this.element.insertAdjacentHTML('beforeend', itemTemplate);
    });
  }
}