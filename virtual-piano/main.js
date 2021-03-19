const playAudio = (src) => {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play();
};

const addActive = (element) => {
  element.classList.remove('piano-key-remove-mouse');
  element.classList.add('piano-key-active', 'piano-key-active-pseudo');
  const audioSrc = `./assets/audio/${element.dataset.note}.mp3`;
  playAudio(audioSrc);
};

const removeActive = (element) => {
  element.classList.add('piano-key-remove-mouse');
  element.classList.remove('piano-key-active', 'piano-key-active-pseudo');
};

const addActiveForHold = ({ target, which}) => {
  if (target.classList.contains('piano-key') && which) {
    addActive(target);
  }
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

piano.addEventListener('mouseout', ({ target, which }) => {
  if (target.classList.contains('piano-key') && which) {
    removeActive(target);
  }
  else if (target.classList.contains('piano-key')) {
    target.classList.add('piano-key-remove-mouse');
  }
});

piano.addEventListener('mousedown', ({ target }) => {
  if (target.classList.contains('piano-key')) {
    piano.addEventListener('mouseover', addActiveForHold);
    addActive(target);
  }
});

document.addEventListener('mouseup', ({ target }) => {
  piano.removeEventListener('mouseover', addActiveForHold);
  if (target.classList.contains('piano-key')) {
    removeActive(target);
  }
});

window.addEventListener('keydown', ({ repeat, code }) => {
  if (repeat) return;
  const letter = (code).slice(3);
  const target = document.querySelector(`[data-letter="${letter}"]`);
  if (!target) return;
  target.classList.remove('piano-key-remove-mouse');
  target.classList.add('piano-key-active');
  const audioSrc = `./assets/audio/${target.dataset.note}.mp3`
  playAudio(audioSrc);
});

window.addEventListener('keyup', ({ code }) => {
  const letter = (code).slice(3);
  const target = document.querySelector(`[data-letter="${letter}"]`);
  if (!target) return;
  target.classList.remove('piano-key-active');
});

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

const btnFullScreen = document.querySelector('.fullscreen');
btnFullScreen.addEventListener('click', (e) => {
  toggleFullScreen();
});