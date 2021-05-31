const createErrorForm = (textErr: string): void => {
  const form = document.querySelector('.form');

  if (form?.querySelector('.form__error')){
    form.firstElementChild?.remove();
  }
  const errorElement = document.createElement('p');
  
  errorElement.classList.add('form__error');
  errorElement.textContent = textErr;

  form?.prepend(errorElement);

};

export default createErrorForm;