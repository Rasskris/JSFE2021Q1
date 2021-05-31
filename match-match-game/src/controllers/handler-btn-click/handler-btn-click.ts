import { clearForm, openModalWindow, changeBtnAtHeader, toggleDisHeaderItems, removeActiveNav } from '../../utils';

const handleBtnClick = (target: HTMLElement): void => {
  
  if (!target.classList.contains('btn')) {
    return;
  }

  if (target.classList.contains('btn-cancel')) {
    clearForm();
  }
  if (target.classList.contains('btn-register')) {
    openModalWindow();
  }
  if (target.classList.contains('btn-start')) {
    removeActiveNav();
    changeBtnAtHeader('Stop Game');
  }
  if (target.classList.contains('btn-stop')) {
    toggleDisHeaderItems();
    changeBtnAtHeader('Start Game');
  }
};

export default handleBtnClick;