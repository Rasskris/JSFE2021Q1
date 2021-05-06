const sidebarBtn = document.querySelector('.sidebar__btn');

const callListener = () => {
  if (!sidebarBtn) {
    return;
  }
  sidebarBtn.addEventListener('click', ({ target }) => {
    const sidebarWrapper = target.nextElementSibling;
    sidebarWrapper.classList.toggle('sidebar__wrapper_active');
  });
};
callListener();
// const sidebar = document.querySelector('.sidebar');

// const domRect = sidebar.getBoundingClientRect();

// window.onscroll = () => {
//   if (window.pageYOffset > 200) {
//     sidebar.classList.add('scroll_active');
//   } else {
//     sidebar.classList.remove('scroll_active');
//   }
// };