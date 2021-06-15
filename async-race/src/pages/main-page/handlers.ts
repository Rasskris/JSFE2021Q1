import { Loader } from '../../libs';
import { renderCarsContainer } from '../garage-page';
import { store, updateStoreForCars, updateStoreForWinners } from '../../store';
import { toggleControlRaceButtons } from '../../shared';
import { renderWinnersContainer } from '../winners-page';

const prevBtnHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  const { view } = store;

  if (!store.carOnStart) {
    toggleControlRaceButtons();
  }

  if (view === 'garage') {
    store.garagePage -= 1;

    await updateStoreForCars(loader);

    renderCarsContainer();
  }
  if (view === 'winners') {
    store.winnersPage -= 1;

    await updateStoreForWinners(loader);

    await renderWinnersContainer(loader);
  }
};

const nextBtnHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  const { view } = store;

  if (!store.carOnStart) {
    toggleControlRaceButtons();
  }

  if (view === 'garage') {
    store.garagePage += 1;

    await updateStoreForCars(loader);

    renderCarsContainer();
  }
  if (view === 'winners') {
    store.winnersPage += 1;

    await updateStoreForWinners(loader);

    await renderWinnersContainer(loader);
  }
};

const paginationHandle = (target: HTMLElement, loader: Loader) => {
  if (target.classList.contains('btn-prev')) {
    prevBtnHandle(target, loader);
  }
  if (target.classList.contains('btn-next')) {
    nextBtnHandle(target, loader);
  }
};

export default paginationHandle;
