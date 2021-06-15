import { Store } from '../interfaces';

const store: Store = {
  cars: null,
  carsCount: null,
  garagePage: 1,
  winners: null,
  winnersCount: null,
  winnersPage: 1,
  view: 'garage',
  sortBy: 'id',
  sortOrder: 'ASC',
  carOnStart: true,
};

export default store;
