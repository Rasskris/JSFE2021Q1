import './game-settings.scss';
import BaseComponent from '../base-component/base-component';
import SettingItem from '../setting-item/setting-item';
import { registerEvent } from  '../../utils';
import { handleSettingClick } from '../../controllers/index';
import { EventProvider } from '../../libs';
import { category, difficulty } from '../../params/game-settings';

export default class GameSettings extends BaseComponent {
  settingCategory: SettingItem;

  settingDifficulty: SettingItem;


  constructor(eventProvider: EventProvider) {
    super('section', ['settings']);
    
    this.settingCategory = new SettingItem(category);
    this.settingDifficulty = new SettingItem(difficulty);
    this.element.append(this.settingCategory.element, this.settingDifficulty.element);

    this.registrEvent(eventProvider);
  }

  registrEvent(eventProvider: EventProvider): void {
    registerEvent(this.element, 'click', 'setting-click', handleSettingClick, eventProvider);
  }
}
