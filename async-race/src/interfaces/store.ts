import Car from './car';
import Winner from './winner';

export default interface Store {
  cars: Car[] | null,
  carsCount: number | null,
  garagePage: number,
  winners: Winner[] | null,
  winnersCount: number | null,
  winnersPage: number,
  view: string;
  sortBy: string | null,
  sortOrder: string | null,
  carOnStart: boolean;
}
