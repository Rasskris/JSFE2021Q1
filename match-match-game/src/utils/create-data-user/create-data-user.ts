import getUniqueId from '../unique-id/unique-id';
import state from '../../state/state';
// import myLocalStorage from '../../storage/local-storage';
import User from '../../interfaces/user';


const createDataUser = (): User => {
  state.user.id = getUniqueId();;

  Object.entries(state.user).forEach((item) => {
    const key = item[0] as string;
    const value = item[1] as string;
    localStorage.setItem(key, value);
  });

  const { id, firstName, lastName, email, avatar } = state.user;

  return { id, firstName, lastName, email, avatar };
};

export default createDataUser;