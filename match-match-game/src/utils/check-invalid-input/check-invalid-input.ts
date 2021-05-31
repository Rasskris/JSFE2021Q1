const hasInvalidInput = (): boolean => {
  const inputs = document.querySelectorAll('.input');
  return Array.from(inputs).some((input) => input.classList.contains('input_invalid'));
};

export default hasInvalidInput;