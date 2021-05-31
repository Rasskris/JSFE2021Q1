const changeBtnAtHeader = (nameBtn: string): void => {
  const headerBtn = document.createElement('a') as HTMLAnchorElement;
  headerBtn.textContent = nameBtn;
  
  if (nameBtn === 'Start Game') {
    headerBtn.setAttribute('href', '#game');
    headerBtn.classList.add('btn-start');
  } else {
    headerBtn.setAttribute('href', '#about');
    headerBtn.classList.add('btn-stop');
  }

  const currentHeaderBtn = document.querySelector('.header__btn');
  currentHeaderBtn?.replaceWith(headerBtn);

  headerBtn.classList.add('btn', 'header__btn');

};

export default changeBtnAtHeader;