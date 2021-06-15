import { Car } from '../../interfaces';
import { renderCarImage } from '../../shared';
import store from '../../store/store';

const renderCar = ({ id, name, color }: Car): string => {
  const templateCar = `
    <div class="car-container" data-car-id="${id}" data-car-name="${name}" data-car-color="${color}">
      <div class="car-control">
        <button class="btn btn-select" id="btn-select-${id}">select</button>
        <button class="btn btn-remove" id="btn-remove-${id}">remove</button>
        <span class="car-name">${name}</span>
      </div>
      <div class="car-drive">
        <button class="btn btn-start" id="btn-start-${id}">start</button>
        <button class="btn btn-stop" id="btn-stop-${id}" disabled>stop</button>
        <div class="car" id="car-${id}">
          ${renderCarImage(color)}
        </div>
        <span class="car-drive__finish">🏁</span>
      </div>
    </div>
  `;

  return templateCar;
};

const renderCars = () => {
  const templateGarage = `
    <h2>Garage (${store.carsCount})</h2>
    <h3>Page #${store.garagePage}</h3>
    <ul class="garage">
      ${store.cars ? (store.cars.map((car) => `<li class="garage__item">${renderCar(car)}</li>`)).join('') : ''}
    </ul>
  `;

  return templateGarage;
};

const renderCarsContainer = () => {
  const carsContainer = document.getElementById('cars-container') as HTMLDivElement;

  carsContainer.innerHTML = renderCars();
};

export { renderCarImage, renderCar, renderCars, renderCarsContainer };
