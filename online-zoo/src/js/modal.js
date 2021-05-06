const btnsModal = document.querySelectorAll('[data-modal]');
const btnsClose = document.querySelectorAll('.close');

const handleOpen = ({ target }) => {
  const nameModal = target.dataset.modal;
  const modal = document.querySelector(`.${nameModal}`)
  console.log(target, nameModal, modal)
  modal.style.display = 'block';
};

const handleClose = ({ target }) => {
  console.log(target)
  const modal = target.closest('.modal');
  modal.style.display = 'none';
};

btnsClose.forEach((btn) => {
  btn.addEventListener('click', handleClose);
});

btnsModal.forEach((btn) => {
  btn.addEventListener('click', handleOpen);
});

window.addEventListener('click', ({ target }) => {
  if (target.classList.contains('modal__wrapper')) {
    target.closest('.modal').style.display = 'none';
  }
})