import { store } from '../store';
import { enableBtn, disableBtn } from '../utils';

type ParamStore = keyof typeof store;

const toggleDisablePrevNextBtn = (pageName: ParamStore, count: number, countPerPage: number) => {
  const btnNext = document.getElementById('btn-next') as HTMLButtonElement;
  const btnPrev = document.getElementById('btn-prev') as HTMLButtonElement;

  const numberOfPage = store[pageName] as number;

  if (numberOfPage > 1) {
    enableBtn(btnPrev);
  } else {
    disableBtn(btnPrev);
  }

  if ((numberOfPage * countPerPage) < count) {
    enableBtn(btnNext);
  } else {
    disableBtn(btnNext);
  }
};

export default toggleDisablePrevNextBtn;
