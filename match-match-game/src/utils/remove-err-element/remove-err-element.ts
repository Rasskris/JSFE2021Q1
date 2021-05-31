const removeErrElement = (currentInput: HTMLInputElement): void => {
  if (currentInput.classList.contains('input_invalid')) {
    currentInput.classList.remove('input_invalid');
    currentInput.nextElementSibling?.remove();
  }
};

export default removeErrElement;