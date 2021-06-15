import { enableBtn, disableBtn } from '../utils';

const toggleControlRaceButtons = () => {
  const resetBtn = document.getElementById('btn-reset') as HTMLButtonElement;
  const raceBtn = document.getElementById('btn-race') as HTMLButtonElement;

  disableBtn(resetBtn);
  enableBtn(raceBtn);
};

export default toggleControlRaceButtons;
