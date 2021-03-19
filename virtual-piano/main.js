const playAudio = (src) => {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play();
};


const btnContainer = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('.btn');
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

btnContainer.addEventListener('click', ({ target }) => {
  buttons.forEach((button) => {
    if (button.classList.contains('btn-active')) {
      button.classList.remove('btn-active');
    }
  });

  target.classList.add('btn-active');

  if (target.classList.contains('btn-letters')) {
    pianoKeys.forEach((pianoKey) => {
      pianoKey.classList.add('piano-key-letter');
    })
  } else {
    pianoKeys.forEach((pianoKey) => {
      pianoKey.classList.remove('piano-key-letter');
    })
  }
});