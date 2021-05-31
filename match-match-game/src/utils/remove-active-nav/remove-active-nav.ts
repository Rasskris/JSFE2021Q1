const removeActiveNav = (): void => {
  const navItems = document.querySelectorAll('.nav__item');

  navItems.forEach((navItem) => {
    navItem.classList.remove('nav__item_active');
  });
};

export default removeActiveNav;