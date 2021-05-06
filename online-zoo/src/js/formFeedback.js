const state = {
  feedbackForm: {
    state: 'valid',
    data: {
      name: '',
      email: '',
      text: '',
    },
    errors: [],
  },
};

const form = document.querySelector('.feedback__form');

const handleChange = (element, errorText, regExp) => {
  if (element.classList.contains('invalid')) {
    element.classList.remove('invalid');
    element.nextElementSibling.remove();
  } 
  if (!regExp.test(element.value)) {
    element.classList.add('invalid');
    const textElement = document.createElement('p');
    textElement.textContent = errorText;
    textElement.classList.add('invalid-text');
    element.insertAdjacentElement('afterend', textElement);
  }
};

form.elements.name.addEventListener('change', ({ target }) => {
  state.feedbackForm.data.cardnumber = target.value;
  const regExp = /^[A-Za-zА-Яа-я]{4,16}$/g;
  const text = 'Field "name" must be contain 4-16 letters';
  handleChange(target, text, regExp)
});

form.elements.email.addEventListener('change', ({ target }) => {
  state.feedbackForm.data.email = target.value;
  const regExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
  const text = 'Field "email" must be contain letters, digits, "@", "." ';
  handleChange(target, text, regExp);
});

//TODO: search optimal regExp for text length 300 chars
form.elements.text.addEventListener('change', ({ target }) => {
  state.feedbackForm.data.year = target.value;
  if (target.classList.contains('invalid')) {
    target.classList.remove('invalid');
    target.nextElementSibling.remove();
  } 
  if (target.value.length > 300) {
    target.classList.add('invalid');
    const errorText = 'Field "text" must not be contain more 300 chars';
    const textElement = document.createElement('p');
    textElement.textContent = errorText;
    textElement.classList.add('invalid-text');
    target.insertAdjacentElement('afterend', textElement);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const modalFeedback = form.closest('.modal');
  modalFeedback.style.display = "none";
});
