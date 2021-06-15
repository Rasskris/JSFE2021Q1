import './garage-page.scss';
import { BaseComponent, GarageForm } from '../../components';
import { Button } from '../../shared';
import { registerEvent } from '../../utils';
import { Loader, EventProvider } from '../../libs';
import { paramsOfCreateCarForm, paramsOfUpdateCarForm } from '../../constants';
import { renderCars } from './renders';
import {
  createCarHandle,
  updateCarHandle,
  raceCarsHandle,
  resetRaceCarsHandle,
  generateCarsHandle,
  carContainerHandle,
} from './handlers';

const txtContentBtnRace = 'race';
const txtContentBtnReset = 'reset';
const txtContentBtnGenerate = 'generate';

const classNameBtnRace = 'btn-race';
const classNameBtnReset = 'btn-reset';
const classNameBtnGenerate = 'btn-generate';

const elementName = 'section';
const className = 'garage-page';

export default class GaragePage extends BaseComponent {
  createCarForm: GarageForm;

  updateCarForm: GarageForm;

  btnRace: Button;

  btnReset: Button;

  btnGenerateCars: Button;

  carsContainer: HTMLDivElement;

  loader: Loader;

  constructor(loader: Loader, eventProvider: EventProvider) {
    super(elementName, className);

    this.loader = loader;

    this.createCarForm = new GarageForm(paramsOfCreateCarForm);
    this.updateCarForm = new GarageForm(paramsOfUpdateCarForm);

    this.btnRace = new Button(txtContentBtnRace, classNameBtnRace);
    this.btnReset = new Button(txtContentBtnReset, classNameBtnReset);
    this.btnGenerateCars = new Button(txtContentBtnGenerate, classNameBtnGenerate);

    this.carsContainer = document.createElement('div');

    this.registerEvent(eventProvider);
  }

  registerEvent(eventProvider: EventProvider) {
    const paramsToregisterEvent = {
      elements: [
        this.createCarForm.element,
        this.updateCarForm.element,
        this.btnRace.element,
        this.btnReset.element,
        this.btnGenerateCars.element,
        this.carsContainer,
      ],
      eventNames: ['submit', 'submit', 'click', 'click', 'click', 'click', 'click', 'click'],
      customEventNames: [
        'create-car', 'update-car', 'race-cars', 'reset-race', 'generate-cars', 'garage-click',
      ],
      eventHandlers: [
        createCarHandle,
        updateCarHandle,
        raceCarsHandle,
        resetRaceCarsHandle,
        generateCarsHandle,
        carContainerHandle,
      ],
    };

    paramsToregisterEvent.elements.forEach((element, i) => {
      const { eventNames, customEventNames, eventHandlers } = paramsToregisterEvent;
      registerEvent(
        element, eventNames[i], customEventNames[i], eventHandlers[i], eventProvider, this.loader,
      );
    });
  }

  renderGaragePage(): GaragePage {
    const formContainer = document.createElement('div');
    const mainBtnContainer = document.createElement('div');

    formContainer.classList.add('form-container');
    mainBtnContainer.classList.add('btn-container', 'btn-general');
    this.carsContainer.classList.add('cars-container');
    this.element.classList.add('active');

    this.btnReset.element.setAttribute('disabled', '');
    this.carsContainer.setAttribute('id', 'cars-container');

    formContainer.append(this.createCarForm.element, this.updateCarForm.element);
    mainBtnContainer.append(
      this.btnRace.element,
      this.btnReset.element,
      this.btnGenerateCars.element,
    );

    this.carsContainer.innerHTML = renderCars();

    this.element.append(formContainer, mainBtnContainer, this.carsContainer);

    return this;
  }
}
