import './form-garage.scss';
import { BaseComponent } from '../base-component';
import { Input } from '../input';
import { Button } from '../../shared';
import { FormParameters } from '../../interfaces';

const typeTextInput = 'text';
const typeColorInput = 'color';

const nameTextInput = 'carName';
const nameColorInput = 'carColor';

const classNameTextInput = 'input-text';
const classNameColorInput = 'input-color';

const elementName = 'form';

export default class GarageForm extends BaseComponent {
  textInput: Input;

  colorInput: Input;

  button: Button;

  constructor({ classNameForm, btnClassName, btnTxtContent }: FormParameters) {
    super(elementName, classNameForm);

    this.textInput = new Input(typeTextInput, nameTextInput, classNameTextInput);
    this.colorInput = new Input(typeColorInput, nameColorInput, classNameColorInput);
    this.button = new Button(btnTxtContent, btnClassName);

    this.element.classList.add('form');

    this.element.append(this.textInput.element, this.colorInput.element, this.button.element);
  }
}
