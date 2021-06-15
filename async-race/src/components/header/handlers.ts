import { store, updateStoreForWinners } from '../../store';
import { enableBtn, disableBtn } from '../../utils';
import { toggleControlRaceButtons, toggleDisablePrevNextBtn } from '../../shared';
import { Loader } from '../../libs';
import { countCarsPerPage, garagePageName } from '../../constants';
import { renderCarsContainer } from '../../pages/garage-page';
import { renderWinnersContainer } from '../../pages/winners-page';

const switchPageHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  if (!target.classList.contains('btn')) {
    return;
  }

  const winnersPage = document.getElementById('winners-page');
  const garagePage = document.getElementById('garage-page');

  if (target.classList.contains('btn-garage')) {
    disableBtn(target);

    await renderCarsContainer();

    const carsCount = store.carsCount as number;

    toggleDisablePrevNextBtn(garagePageName, carsCount, countCarsPerPage);

    garagePage?.classList.toggle('active');
    winnersPage?.classList.toggle('active');

    store.view = 'garage';

    const btnWinner = document.getElementById('btn-winners') as HTMLButtonElement;

    enableBtn(btnWinner);
  }
  if (target.classList.contains('btn-winners')) {
    await updateStoreForWinners(loader);
    await renderWinnersContainer(loader);

    disableBtn(target);

    winnersPage?.classList.toggle('active');
    garagePage?.classList.toggle('active');

    store.view = 'winners';

    const btnGarage = document.getElementById('btn-garage') as HTMLButtonElement;

    if (!store.carOnStart) {
      toggleControlRaceButtons();
    }

    enableBtn(btnGarage);
  }
};

export default switchPageHandle;
