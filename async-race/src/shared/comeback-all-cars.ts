import { store } from '../store';
import { enableBtn, disableBtn } from '../utils';
import comebackCarToStart from './comeback-car';

const comebackAllCarsToStart = () => {
  const resetBtn = document.getElementById('btn-reset') as HTMLButtonElement;

  disableBtn(resetBtn);

  store.cars?.forEach(({ id }) => {
    if (id) {
      comebackCarToStart(id);
    }
  });

  store.carOnStart = true;

  const raceBtn = document.getElementById('btn-race') as HTMLButtonElement;
  enableBtn(raceBtn);
};

export default comebackAllCarsToStart;
