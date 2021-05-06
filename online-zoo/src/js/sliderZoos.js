const videosSizeS = document.querySelectorAll('.animal-videos__item_size_s');
const videoSizeL = document.querySelector('.animal-videos__item_size_l');

const handleSwap = ({ target }) => {
  const srcVideoS = target.dataset.video;
  const srcImageS = target.dataset.image;
  const srcImageL = videoSizeL.dataset.image;
  const srcVideoL = videoSizeL.dataset.video;
  videoSizeL.querySelector('iframe').setAttribute('src', srcVideoS);
  videoSizeL.dataset.image = srcImageS;
  videoSizeL.dataset.video = srcVideoS;
  target.dataset.image = srcImageL;
  target.dataset.video = srcVideoL;
  target.style.backgroundImage = `url(${srcImageL})`;
};

videosSizeS.forEach((videoS) => {
  const srcImageS = videoS.dataset.image;
  videoS.style.backgroundImage = `url(${srcImageS})`;
  videoS.addEventListener('click', handleSwap);
});