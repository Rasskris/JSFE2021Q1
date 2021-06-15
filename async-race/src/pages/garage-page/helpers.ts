import { Loader, Engine } from '../../libs';
import { store } from '../../store';
import { DrivePromise } from '../../interfaces';
import { carNames, carModels } from '../../constants';

const getRandomCarName = () => {
  const randomIndex = Math.floor(Math.random() * carNames.length);

  const carName = carNames[randomIndex];
  const carModel = carModels[randomIndex];

  return `${carName} ${carModel}`;
};

const getInputs = (form: HTMLFormElement) => {
  const nameInput = form.elements[0] as HTMLInputElement;
  const colorInput = form.elements[1] as HTMLInputElement;

  return { nameInput, colorInput };
};

const clearInputs = (form: HTMLFormElement) => {
  const { nameInput, colorInput } = getInputs(form);

  nameInput.value = '';
  colorInput.value = '#000000';
};

const startCarAnimation = (id: number, duration: number) => {
  const carElement = document.getElementById(`car-${id}`) as HTMLDivElement;

  carElement.style.animation = `car-drive ${duration}ms linear forwards`;
  carElement.style.animationPlayState = 'running';
};

const stopCarAnimation = (id: number) => {
  const carElement = document.getElementById(`car-${id}`) as HTMLDivElement;

  carElement.style.animationPlayState = 'paused';
};

const startCarDriving = async (id: number, loader: Loader, engine: Engine) => {
  const { velocity, distance } = await engine.start(id, loader);
  const time = distance / velocity;

  startCarAnimation(id, time);

  return time;
};

const startRace = async (loader: Loader, engine: Engine) => (
  await store.cars?.map(async ({ id, name }) => {
    if (id) {
      const time = await startCarDriving(id, loader, engine);

      return engine.drive(id, name, time);
    }
  }) as Promise<DrivePromise>[]
);

const processWinner = async (loader: Loader, winnersURL: string, id: number, time: number) => {
  const currentWinner = await loader.getItem(winnersURL, id);

  if (Object.keys(currentWinner).length === 0) {
    await loader.createItem(winnersURL, { id, wins: 1, time });
  } else {
    const { wins, time: currentTime } = currentWinner;
    const newTime = currentTime >= time ? currentTime : time;

    await loader.updateItem(winnersURL, id, { wins: wins + 1, time: newTime });
  }
};

const showMessageOfWinner = (name: string, time: number) => {
  const countMsInSeconds = 1000;
  const seconds = (time / countMsInSeconds).toFixed(2);

  const modalWindow = document.getElementById('modal') as HTMLDivElement;
  const messageElement = document.getElementById('message') as HTMLDivElement;

  const templateOfMessage = `Car ${name} won with ${seconds}s time`;
  messageElement.innerHTML = templateOfMessage;

  setTimeout(() => modalWindow.setAttribute('style', 'display: block'), 3000);
};

let isFirstSuccess = true;

const processRace = async (
  drivePromises: Promise<DrivePromise>[], carIds: number[], winnersURL: string, loader: Loader,
): Promise<void> => {
  if (drivePromises.length === 0) {
    isFirstSuccess = true;
    return;
  }

  const { success, id, name, time } = await Promise.race(drivePromises);
  const targetIndex = carIds.findIndex((carId) => carId === id);

  const filteredPromises = drivePromises.filter((_, index) => index !== targetIndex);
  const filteredIds = carIds.filter((carId) => carId !== id);

  if (!success) {
    stopCarAnimation(id);
  }
  if (isFirstSuccess && success) {
    isFirstSuccess = false;

    await processWinner(loader, winnersURL, id, time);

    showMessageOfWinner(name, time);
  }

  processRace(filteredPromises, filteredIds, winnersURL, loader);
};

export {
  getRandomCarName,
  getInputs,
  clearInputs,
  processRace,
  startCarAnimation,
  stopCarAnimation,
  startCarDriving,
  startRace,
  showMessageOfWinner,
};
