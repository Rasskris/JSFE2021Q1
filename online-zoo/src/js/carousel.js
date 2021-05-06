const carouselList = document.querySelector('.cards');
const carouselItems = document.querySelectorAll('.cards__card');
const elems = Array.from(carouselItems);

const getOrder = (current, active) => {
  const diff = current - active;
  if (Math.abs(current - active) > 2) {
    return -current
  }
  return diff;
};

const update = (newActive) => {
  const newActiveOrder = newActive.dataset.order;
  
  console.log(newActiveOrder);
  const current = elems.find((elem) => elem.dataset.order == 0);
  const prev = elems.find((elem) => elem.dataset.order == -1);
  const next = elems.find((elem) => elem.dataset.order == 1);
  const first = elems.find((elem) => elem.dataset.order == -2);
  const last = elems.find((elem) => elem.dataset.order == 2);

  [current, prev, next, first, last].forEach((item) => {
    const itemOrder = item.dataset.order;
    item.dataset.order = getOrder(itemOrder, newActiveOrder)
  });
};

const checkCarousel = (carousel) => {
  if (!carousel) {
    return;
  }
  carousel.addEventListener('click', ({ target }) => {
    const card = target.closest('.cards__card');
    if (!card) {
      return;
    };
    update(card);
  })
};

checkCarousel(carouselList);
// checkBtn(btnNext, btnPrev);
// carouselList.addEventListener('click', ({ target }) => {
//   const card = target.closest('.cards__card');
//   if (!card) {
//     return;
//   };
//   update(card);
// });