const createAvatar = (imgSrc: string): HTMLElement => {
  const avatar = document.createElement('a');
  avatar.classList.add('header__avatar');
  avatar.setAttribute('href', '#about');
  avatar.setAttribute('style', `background-image: url('${imgSrc}')`);
  return avatar;
};

export default createAvatar;
