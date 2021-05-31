const toggleDisHeaderItems = (): void => {
  const navItems = document.querySelectorAll('.nav__item');
  const headerLogo = document.querySelector('.header__logo');

  headerLogo?.classList.toggle('disable');
  navItems.forEach((navItem) => {
    navItem.classList.toggle('disable');
  });
};

export default toggleDisHeaderItems;