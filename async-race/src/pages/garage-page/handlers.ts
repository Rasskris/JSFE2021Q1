import { Loader, Engine } from '../../libs';
import { renderCarsContainer } from './renders';
import { getRandomColor, enableBtn, disableBtn } from '../../utils';
import { store, updateStoreForCars } from '../../store';
import { garageURL, winnersURL } from '../../constants';
import { comebackCarToStart, comebackAllCarsToStart } from '../../shared';
import {
  getRandomCarName,
  getInputs,
  clearInputs,
  processRace,
  startCarDriving,
  startRace,
  stopCarAnimation } from './helpers';

const engine = new Engine();

const createCarHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  const formCreate = target as HTMLFormElement;

  const { nameInput, colorInput } = getInputs(formCreate);

  const car = { name: nameInput.value, color: colorInput.value };

  await loader.createItem(garageURL, car);

  await updateStoreForCars(loader);

  clearInputs(formCreate);

  renderCarsContainer();
};

const updateCarHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  const formUpdate = target as HTMLFormElement;

  const { nameInput, colorInput } = getInputs(formUpdate);

  if (nameInput.value === '') {
    return;
  }

  const car = { name: nameInput.value, color: colorInput.value };

  const id = Number(formUpdate.dataset.carId);

  await loader.updateItem(garageURL, id, car);

  await updateStoreForCars(loader);

  clearInputs(formUpdate);

  renderCarsContainer();
};

const generateCarsHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  disableBtn(target);

  const carsCount = 100;
  const arrOfCars = new Array(carsCount)
    .fill('')
    .map(() => ({ name: getRandomCarName(), color: getRandomColor() }));

  await Promise.all(arrOfCars.map(async (car) => loader.createItem(garageURL, car)));

  await updateStoreForCars(loader);

  renderCarsContainer();

  enableBtn(target);
};

const raceCarsHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  const resetBtn = document.getElementById('btn-reset') as HTMLButtonElement;

  store.carOnStart = false;

  disableBtn(target);
  disableBtn(resetBtn);

  const drivePromises = await startRace(loader, engine);
  const carIds = store.cars?.map((car) => car.id) as number[];

  processRace(drivePromises, carIds, winnersURL, loader);

  enableBtn(resetBtn);
};

const resetRaceCarsHandle = async (): Promise<void> => {
  comebackAllCarsToStart();
};

const carContainerHandle = async (target: HTMLElement, loader: Loader): Promise<void> => {
  if (!target.classList.contains('btn')) {
    return;
  }
  const carContainer = target.closest('.car-container') as HTMLDivElement;
  const carId = Number(carContainer.getAttribute('data-car-id'));

  if (target.classList.contains('btn-select')) {
    disableBtn(target);

    const formUpdate = document.querySelector('.form-update') as HTMLFormElement;

    const { nameInput, colorInput } = getInputs(formUpdate);

    formUpdate.dataset.carId = `${carId}`;

    nameInput.setAttribute('value', `${carContainer.dataset.carName}`);
    colorInput.setAttribute('value', `${carContainer.dataset.carColor}`);

    enableBtn(target);
  }
  if (target.classList.contains('btn-remove')) {
    disableBtn(target);

    await loader.removeItem(garageURL, carId);
    await loader.removeItem(winnersURL, carId);

    await updateStoreForCars(loader);

    renderCarsContainer();

    enableBtn(target);
  }
  if (target.classList.contains('btn-start')) {
    const btnStopCar = document.getElementById(`btn-stop-${carId}`) as HTMLButtonElement;

    disableBtn(target);
    enableBtn(btnStopCar);

    const time = await startCarDriving(carId, loader, engine);

    // TODO fix
    const { success } = await engine.drive(carId, 'name', time);

    if (!success) {
      stopCarAnimation(carId);
    }
  }
  if (target.classList.contains('btn-stop')) {
    disableBtn(target);

    await engine.stop(carId, loader);

    comebackCarToStart(carId);

    const btnStartCar = document.getElementById(`btn-start-${carId}`) as HTMLButtonElement;

    enableBtn(btnStartCar);
  }
};

export {
  createCarHandle,
  updateCarHandle,
  raceCarsHandle,
  resetRaceCarsHandle,
  generateCarsHandle,
  carContainerHandle,
};
