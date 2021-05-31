const handleLogout = (): void => {
  localStorage.clear();

  const header = document.querySelector('.header');
  const avatar = header?.querySelector('.header__avatar');
  const currentHeaderBtn = header?.querySelector('.header__btn');
  const headerBtn = document.createElement('button');
  headerBtn.textContent = 'Rigister new player'
  headerBtn.classList.add('btn', 'header__btn', 'btn-register');

  currentHeaderBtn?.replaceWith(headerBtn);
  avatar?.remove();
};

export default handleLogout;