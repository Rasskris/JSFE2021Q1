const state = {
  payForm: {
    state: 'valid',
    data: {
      cardnumber: '',
      month: '',
      year: '',
      cardholder: '',
      cvc: '',
    },
    errors: [],
  },
};

const form = document.querySelector('.pay__form');
const btnPay = form.querySelector('.pay__btn');
const checkValid = () => {
  const namesOfInputs = Object.keys(state.payForm.data);
  namesOfInputs.forEach((input) => {
    if (form.elements[input].classList.contains('invalid')) {
      console.log(input)
      state.payForm.state = 'invalid';
    }
  });
  if (state.payForm.state === 'invalid') {
    btnPay.disabled = true;
  } else {
    btnPay.disabled = false;
  }
};

const handleChange = (element, errorText, regExp) => {
  if (element.classList.contains('invalid')) {
    element.classList.remove('invalid');
    element.nextElementSibling.remove();
  } 
  if (!regExp.test(element.value)) {
    element.classList.remove('valid');
    element.classList.add('invalid');
    const textElement = document.createElement('p');
    textElement.textContent = errorText;
    textElement.classList.add('invalid-text');
    state.payForm.state = 'invalid'
    if (element.name === 'cvc') {
      textElement.classList.add('invalid-cvc');
    }
    element.insertAdjacentElement('afterend', textElement);
    checkValid();
  } else {
    element.classList.add('valid');
    state.payForm.state = 'valid';
    checkValid();
  }
};

form.elements.cardnumber.addEventListener('change', ({ target }) => {
  state.payForm.data.cardnumber = target.value;
  const regExp = /^\d{16}$/g;
  const text = 'Field "card number" must be contain 16 digits';
  handleChange(target, text, regExp)
});

form.elements.month.addEventListener('change', ({ target }) => {
  state.payForm.data.month = target.value;
  const regExp = /^0\d{1}$/g;
  const text = 'Field "month" must be contain digit 01-12';
  handleChange(target, text, regExp);
});

form.elements.year.addEventListener('change', ({ target }) => {
  state.payForm.data.year = target.value;
  const regExp = /^\d{2}$/g;
  const text = 'Field "year" must be contain 2 digits';
  handleChange(target, text, regExp);
});
form.elements.cardholder.addEventListener('change', ({ target }) => {
  state.payForm.data.cardholder = target.value;
  const regExp = /[A-Za-z]/g;
  const text = 'Field "cardholder" must be contain only letters';
  handleChange(target,text, regExp);
});
form.elements.cvc.addEventListener('change', ({ target }) => {
  state.payForm.data.cvc = target.value;
  const regExp = /^\d{3}$/g;
  const text = 'Field "cvc" must be contain 3 digits';
  handleChange(target, text, regExp);
});


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const modalPay = form.closest('.modal');
  modalPay.style.display = "none";
  const modalGratitude = document.querySelector('.gratitude');
  modalGratitude.style.display = "block";
});
