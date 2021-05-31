import './form.scss';
import BaseComponent from "../base-component/base-component";
import Input from "../input/input";
import Button from "../../shared/button/button";
import { registerEvent, closeModalWindow } from '../../utils';
import { EventProvider } from '../../libs';
import { handleSubmit, handleBtnClick, handleUploadImg, handleInput } from '../../controllers';
import Storage from '../../storage/storage';

export default class Form extends BaseComponent {
  inputContainer: HTMLDivElement;

  textInputsContainer: HTMLDivElement;

  btnContainer: HTMLDivElement;
  
  fieldFirstName: Input;

  fieldLastName: Input;

  fieldEmail: Input;

  fieldPhoto: Input;

  addUserBtn: Button;

  cancelBtn: Button;

  constructor(eventProvider: EventProvider, storage: Storage) {
    super('form', ['form']);

    this.fieldFirstName = new Input('text', 'First Name', 'firstName');
    this.fieldLastName = new Input('text', 'Last Name', 'lastName');
    this.fieldEmail = new Input('email', 'E-mail', 'email');
    this.fieldPhoto = new Input('file', 'Load picture', 'upload');

    this.inputContainer = document.createElement('div');
    this.textInputsContainer = document.createElement('div');
    this.btnContainer = document.createElement('div');

    this.addUserBtn = new Button('Add User', 'btn-add');
    this.cancelBtn = new Button('Cancel', 'btn-cancel');
    
    this.renderForm();
    this.registerEvent(eventProvider, storage);
  }

  registerEvent(eventProvider: EventProvider, storage: Storage): void {
    registerEvent(this.textInputsContainer, 'input', 'typing-data', handleInput, eventProvider);
    registerEvent(this.fieldPhoto.element, 'change', 'upload-img', handleUploadImg, eventProvider);
    registerEvent(this.element, 'submit', 'add-user', handleSubmit, eventProvider, storage);
    registerEvent(this.cancelBtn.element, 'click', 'cancel-click', handleBtnClick, eventProvider);
  }

  renderForm(): void {
    const fieldFirstName = this.fieldFirstName.element;
    const fieldLastName = this.fieldLastName.element;
    const fieldEmail = this.fieldEmail.element;
    const fieldPhoto = this.fieldPhoto.element;

    fieldPhoto.classList.add('input-upload');
    fieldPhoto.setAttribute('accept', '.jpg, .jpeg, .png, .svg');
    fieldPhoto.setAttribute('size', '2097152');
    fieldPhoto.removeAttribute('maxlength');
    fieldPhoto.removeAttribute('required');

    const labelFieldPhoto = document.createElement('label');
    labelFieldPhoto.className = 'form__label';
    labelFieldPhoto.setAttribute('title', 'Img size must be less 2Mb');
    labelFieldPhoto.appendChild(fieldPhoto);

    const addUserBtn = this.addUserBtn.element;
    const cancelBtn = this.cancelBtn.element;

    addUserBtn.setAttribute('type', 'submit');
    cancelBtn.setAttribute('type', 'reset');

    this.inputContainer.classList.add('form__inputs');
    this.textInputsContainer.classList.add('inputs-text');
    this.btnContainer.classList.add('form__btns');
    
    this.textInputsContainer.append(fieldFirstName, fieldLastName, fieldEmail);
    this.inputContainer.append(this.textInputsContainer, labelFieldPhoto);
    this.btnContainer.append(addUserBtn, cancelBtn);

    const closeElement = document.createElement('span');
    closeElement.textContent = 'x';
    closeElement.className = 'form__close';
    closeElement.addEventListener('click', () => closeModalWindow());
    this.element.append(closeElement, this.inputContainer, this.btnContainer);
  }
 }