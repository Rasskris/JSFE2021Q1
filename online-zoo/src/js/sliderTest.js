const btnNext = document.querySelectorAll('.slider__btn_right')[1];
const btnPrev = document.querySelectorAll('.slider__btn_left')[1];

// const container = document.querySelectorAll('.slider')[1];
const lines = document.querySelectorAll('.testimonials-cards');
let index = 0;

const handleNext = () => {
  lines[index].classList.add('slider__cards_hidden');
  index += 1;
  index = index >= lines.length ? 0 : index;
  console.log(index);
  lines[index].classList.remove('slider__cards_hidden');
};

const handlePrev = () => {
  lines[index].classList.add('slider__cards_hidden');
  index -= 1;
  index = index < 0 ? lines.length - 1 : index;
  console.log(index);
  lines[index].classList.remove('slider__cards_hidden');
};

const checkBtn = (btn1, btn2) => {
  if (!btn1 || !btn2) {
    return;
  }
  btn1.addEventListener('click', handleNext);
  btn2.addEventListener('click', handlePrev);
};
checkBtn(btnNext, btnPrev);
// btnNext.addEventListener('click', handleNext);
// btnPrev.addEventListener('click', handlePrev);