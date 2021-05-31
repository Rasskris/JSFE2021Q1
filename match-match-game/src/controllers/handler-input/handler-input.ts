import { validate, addErrElement, removeErrElement, hasInvalidInputs } from '../../utils';
import state from '../../state/state';

interface Map {
  [key: string]: { regExp: RegExp, textErr: string}
}
const map: Map = {
  firstName: {
    regExp: /^(?!\d+$)[^~!@#$%*()_—+=|:;"'`<>,.?/^]{1,30}$/gi,
    textErr: "First Name can't be empty, consist of numbers and service chars",
  },
  lastName: {
    regExp: /^(?!\d+$)[^~!@#$%*()_—+=|:;"'`<>,.?/^]{1,30}$/gi,
    textErr: "Last Name can't be empty, consist of numbers and service chars",
  },
  email: {
    regExp: /\b[\w.-]+@[\w.-]+\.\w+\b/gi,
    textErr: "Email can't be empty and must comply with standard rule [RFC]",
  },
}

const handleInput = (target: HTMLElement): void => {
  const input = target as HTMLInputElement;
  const { name, value } = input;
  const { regExp, textErr } = map[name];
  
  const isValid = validate(regExp, value);

  if (isValid) {
    removeErrElement(input);
    input.classList.add('input_valid');
    state.user[name] = value;
  } else {
    removeErrElement(input);
    input.classList.add('input_invalid');
    addErrElement(input, textErr);
  }

  const btnAddUser = document.querySelector('.btn-add');
  if (hasInvalidInputs()) {
    btnAddUser?.setAttribute('disabled', '');
  } else {
    btnAddUser?.removeAttribute('disabled');
  }
};

export default handleInput;