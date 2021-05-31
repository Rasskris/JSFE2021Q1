import state from '../../state/state';
import createAvatar from '../create-avatar/create-avatar';
import { handleLogout } from '../../controllers';

const addAvatarToHeader = (): void => {
  const header = document.querySelector('.header');
 
  const imgSrc = state.user.avatar as string;
  const avatar = createAvatar(imgSrc);

  header?.append(avatar);
  avatar.addEventListener('click', () => {
    handleLogout();
  });
};

export default addAvatarToHeader;