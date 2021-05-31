const addActiveNav = (route: string): void => {
  const navItem = document.querySelector(`.${route}`)?.closest('.nav__item');

  navItem?.classList.add('nav__item_active');
};

export default addActiveNav;