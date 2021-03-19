const playAudio = (src) => {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play();
};
