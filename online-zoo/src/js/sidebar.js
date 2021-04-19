const sidebarBtn = document.querySelector('.sidebar__btn');

sidebarBtn.addEventListener('click', ({ target }) => {
  const sidebarWrapper = target.previousElementSibling;
  sidebarWrapper.classList.toggle('sidebar__wrapper_active');
})