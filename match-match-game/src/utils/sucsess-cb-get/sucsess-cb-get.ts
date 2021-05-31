// import myLocalStorage from '../../storage/local-storage';
import changeBtnAtHeader from '../change-button/change-button';
import addAvatarToHeader from '../add-avatar/add-avatar';

const sucsessCbOfGet = (): void => {

  if (!localStorage.getItem('firstName')) {
    return;
  }

  changeBtnAtHeader('Start Game');
  addAvatarToHeader();
};

export default sucsessCbOfGet;