import removeErrElement from '../remove-err-element/remove-err-element';

const clearForm = (): void => {
  const formInputs = document.querySelectorAll('input');

  formInputs.forEach((input) => {
    if (input.classList.contains('input_valid')) {
      input.classList.remove('input_valid');
    }
    removeErrElement(input);
  })
};

export default clearForm;