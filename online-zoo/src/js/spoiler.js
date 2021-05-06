const spoilerBtns = document.querySelectorAll('.spoiler__btn');

spoilerBtns.forEach((btn) => {
  btn.addEventListener('click', ({ target }) => {
    console.log(btn)
    const spoiler = target.closest('.spoiler');
    const spoilerDesc = target.previousElementSibling;
    spoiler.classList.toggle('spoiler_active');
    spoilerDesc.classList.toggle('spoiler__desc_active');
    target.classList.toggle('spoiler__btn_active');
  });
});

const titles = document.querySelectorAll('.spoiler__title');
const descs = document.querySelectorAll('.spoiler__desc');

titles.forEach((title) => {
  title.addEventListener('click', ({ target }) => {
    const spoiler = target.closest('.spoiler');
    if (spoiler.classList.contains('spoiler_active')){
      return;
    }
    const spoilerDesc = spoiler.querySelector('.spoiler__desc');
    const spoilerBtn = spoiler.querySelector('.spoiler__btn');
    spoiler.classList.add('spoiler_active');
    spoilerDesc.classList.add('spoiler__desc_active');
    spoilerBtn.classList.toggle('spoiler__btn_active');
  });
});

descs.forEach((desc) => {
  desc.addEventListener('click', ({ target }) => {
    const spoiler = target.closest('.spoiler');
    // const spoilerDesc = spoiler.querySelector('.spoiler__desc');
    const spoilerBtn = spoiler.querySelector('.spoiler__btn');
    spoiler.classList.remove('spoiler_active');
    target.classList.remove('spoiler__desc_active');
    spoilerBtn.classList.remove('spoiler__btn_active');
  });
});