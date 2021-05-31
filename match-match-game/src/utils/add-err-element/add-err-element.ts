const addErrElement = (currentInput: HTMLInputElement, textErr: string): void => {

  if (currentInput.classList.contains('input_valid')) {
    currentInput.classList.remove('input_valid');
  }

  const errElement = document.createElement('p');
  errElement.classList.add('error');
  errElement.textContent = textErr;
  
  currentInput.insertAdjacentElement('afterend', errElement);
};

export default addErrElement;