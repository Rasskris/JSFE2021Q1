const clearInputs = (form: HTMLFormElement) => {
  const inputs = form.elements;

  Array.from(inputs).forEach((input) => {
    input.setAttribute('value', '');
  });
};

export default clearInputs;
