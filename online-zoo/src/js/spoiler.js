const spoilerBtns = document.querySelectorAll('.spoiler__btn');

spoilerBtns.forEach((btn) => {
  btn.addEventListener('click', ({ target }) => {
    console.log(btn)
    const spoiler = target.closest('.spoiler');
    const spoilerDesc = target.previousElementSibling;
    spoiler.classList.toggle('spoiler_active');
    spoilerDesc.classList.toggle('spoiler__desc_active');
    target.classList.toggle('spoiler__btn_active');
  })
})