import { Data } from '../../interfaces/storage';
import Storage from '../../storage/storage';
import { createDataUser, changeBtnAtHeader, createErrorForm, closeModalWindow, addAvatarToHeader } from '../../utils';

const sucsessCb = (): void => {
  changeBtnAtHeader('Start Game');
  addAvatarToHeader();
  closeModalWindow();
};

const textErr = 'This email already exists!'
const errorCb = (): void => createErrorForm(textErr);

const handleSubmit = async (target: HTMLElement, storage?: Storage): Promise<void> => {
  const dataUser = createDataUser() as Data;
  storage?.add(dataUser, 'users', 'readwrite', sucsessCb, errorCb);
};

export default handleSubmit;
