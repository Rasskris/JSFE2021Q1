const state = {
  donatForm: {
    state: 'valid',
    data: {
      animals: '',
      amount: '',
      currency: '',
      text: '',
    },
    errors: [],
  },
};

const form = document.querySelector('.donat__form');
const btnDonat = form.querySelector('.donat__btn');

const handleChange = (element, errorText, regExp) => {
  if (element.classList.contains('invalid')) {
    element.classList.remove('invalid');
    element.nextElementSibling.remove();
  } 
  if (!regExp.test(element.value)) {
    console.log(regExp.test(element.value))
    element.classList.add('invalid');
    const textElement = document.createElement('p');
    textElement.textContent = errorText;
    textElement.classList.add('invalid-text');
    element.insertAdjacentElement('afterend', textElement);
  }
};

// form.elements.animals.addEventListener('change', ({ target }) => {
//   state.donatForm.data.animals = target.value;
//   const regExp = /^\d{16}$/g;
//   const text = 'Field "card number" must be contain 16 digits';
//   handleChange(target, text, regExp)
// });

form.elements.amount.addEventListener('change', ({ target }) => {
  console.log(target)
  state.donatForm.data.amount = target.value;
  const regExp = /^\d{1,4}$/g;
  const text = 'Field "amount" must be contain digit 1-9999';
  handleChange(target, text, regExp);
  if (!target.classList.contains('invalid')) {
    btnDonat.disabled = false;
  } else {
    btnDonat.disabled = true;
  }
});

//TODO: implement optimal regExp for text length 280 chars
form.elements.text.addEventListener('change', ({ target }) => {
  state.donatForm.data.text = target.value;
  if (target.classList.contains('invalid')) {
    target.classList.remove('invalid');
    target.nextElementSibling.remove();
  } 
  if (target.value.length > 280) {
    target.classList.add('invalid');
    const errorText = 'Field "text" must not be contain more 280 chars';
    const textElement = document.createElement('p');
    textElement.textContent = errorText;
    textElement.classList.add('invalid-text');
    target.insertAdjacentElement('afterend', textElement);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const modalDonat = form.closest('.modal');
  modalDonat.style.display = "none";
  const modalPay = document.querySelector('.pay');
  modalPay.style.display = "block";
});
