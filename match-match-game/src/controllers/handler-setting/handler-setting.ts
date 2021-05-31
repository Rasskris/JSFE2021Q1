import state from '../../state/state';

const handleSettingClick = (target: HTMLElement): void => {
  if (!target.closest('.setting__item')) {
    return;
  }

  const settingItem = target.closest('.setting__item') as HTMLDivElement;
  const list = settingItem.querySelector('.list') as HTMLUListElement;

  if (target.classList.contains('setting__btn')) {
    target.classList.toggle('setting__btn_active');
    list.classList.toggle('list_active');
  } 
  if (target.closest('.list__item')) {
    const listItem = target.closest('.list__item') as HTMLLIElement;
    const settingName = listItem.querySelector('.list__item-name')?.textContent as string;
    const settingDescElem = settingItem.querySelector('.setting__desc') as HTMLParagraphElement;
    const settingBtn = settingItem.querySelector('.setting__btn') as HTMLElement;

    const settingType = list.dataset.setting as string;
    const settingData = listItem.dataset.itemName as string;

    state.gameSetting[settingType] = settingData;
    settingDescElem.innerHTML = '';
    settingDescElem.textContent = settingName;

    list.classList.remove('list_active');
    settingBtn.classList.remove('setting__btn_active');
  }

};

export default handleSettingClick;
