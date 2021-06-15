import store from './store';
import { toggleDisablePrevNextBtn } from '../shared';
import { garageURL, winnersURL, garagePageName, winnersPageName, countCarsPerPage, countWinnersPerPage } from '../constants';
import { Loader } from '../libs';

const updateStoreForCars = async (loader: Loader) => {
  const requestParams = { _page: store.garagePage, _limit: countCarsPerPage };

  const { item: cars, count: carsCount } = await loader.getItems(garageURL, requestParams);

  store.cars = cars;
  store.carsCount = carsCount;

  toggleDisablePrevNextBtn(garagePageName, carsCount, countCarsPerPage);
};

const updateStoreForWinners = async (loader: Loader) => {
  const requestParams = {
    _page: store.winnersPage,
    _limit: countWinnersPerPage,
    _sort: store.sortBy as string,
    _order: store.sortOrder as string,
  };

  const { item: winners, count: winnersCount } = await loader.getItems(winnersURL, requestParams);

  store.winners = winners;
  store.winnersCount = winnersCount;

  toggleDisablePrevNextBtn(winnersPageName, winnersCount, countWinnersPerPage);
};

export { updateStoreForCars, updateStoreForWinners };
