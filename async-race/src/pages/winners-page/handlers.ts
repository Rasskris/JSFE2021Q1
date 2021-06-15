import { Loader } from '../../libs';
import { store, updateStoreForWinners } from '../../store';
import { renderWinnersContainer } from './renders';

const tableClickHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  if (!target.classList.contains('sort')) {
    return;
  }

  if (target.classList.contains('asc') || target.classList.contains('desc')) {
    return;
  }

  store.sortOrder = target.dataset.sortOrder as string;
  store.sortBy = target.dataset.sortBy as string;

  await updateStoreForWinners(loader);
  await renderWinnersContainer(loader);
};

export default tableClickHandle;
