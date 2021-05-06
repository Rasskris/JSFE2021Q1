
// // const container = document.querySelectorAll('.slider')[0];
// const lines = document.querySelectorAll('.pets-cards');
// let index = 0;

// const handleNext = () => {
  //   lines[index].classList.add('slider__cards_hidden');
  //   index += 1;
  //   index = index >= lines.length ? 0 : index;
  //   console.log(index);
  //   lines[index].classList.remove('slider__cards_hidden');
  // };
  
  // const handlePrev = () => {
    //   lines[index].classList.add('slider__cards_hidden');
    //   index -= 1;
    //   index = index < 0 ? lines.length - 1 : index;
    //   console.log(index);
    //   lines[index].classList.remove('slider__cards_hidden');
    // };
    
    // // btnNext.addEventListener('click', handleNext);
    // // btnPrev.addEventListener('click', handlePrev);
    
    // const callListener = (btn1, btn2) => {
      //   if (!btn1 || !btn2) {
        //     return;
        //   }
        //   btn1.addEventListener('click', handleNext);
        //   btn2.addEventListener('click', handlePrev);
        // };
        // callListener(btnNext, btnPrev);
        
const next = document.querySelectorAll('.slider__btn_right')[0];
const prev = document.querySelectorAll('.slider__btn_left')[0];

let slider = document.querySelector('.slider__wrapper-1');
let sliderItems = document.querySelector('.slider__wrapper-2');

function slide(items, prev, next) {
  if(!next || !prev || !slider || !sliderItems) {
    return;
  }
  let posInitial;
  let slides = items.getElementsByClassName('pets-cards');
  let slidesLength = slides.length;
  // let slideSize = items.getElementsByClassName('pets-cards')[0].offsetWidth;
  let slideSize = 992;
  let firstSlide = slides[0];
  let lastSlide = slides[slidesLength - 1];
  let cloneFirst = firstSlide.cloneNode(true);
  let cloneLast = lastSlide.cloneNode(true);
  let index = 0;
  let allowShift = true;
  
  console.log(slideSize, index)
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);

  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  items.addEventListener('transitionend', checkIndex);
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
      console.log(allowShift, index)
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }
    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}

slide(sliderItems, prev, next);