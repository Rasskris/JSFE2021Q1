import './setting-item.scss';
import DataItem from "../../interfaces/data-item";
import BaseComponent from '../base-component/base-component';
import DropDownList from '../drop-down-list/drop-down-list';

interface DataSetting {
  settingTitle: string,
  settingDesc: string,
  settingType: string,
  dataList: DataItem[],
}

export default class SettingItem extends BaseComponent {
  dropDownList: DropDownList;

  constructor({ settingTitle, settingDesc, settingType, dataList }: DataSetting){
    super('div', ['setting__item']);

    this.dropDownList = new DropDownList(settingType, dataList);
    this.renderSettingItem(settingTitle, settingDesc);
  }

  renderSettingItem(settingTitle: string, settingDesc: string): void {
    const template = `
      <div class="setting__text">
        <h3 class="setting__title">${settingTitle}</h3>
        <p class="setting__desc">${settingDesc}</p>
      </div>
      <span class="setting__btn"></span>
    `;

    this.element.insertAdjacentHTML('afterbegin', template);
    this.element.appendChild(this.dropDownList.element);
  }
}