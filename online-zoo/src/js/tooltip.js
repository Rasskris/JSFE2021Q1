const links = document.querySelectorAll('.link_hover');
links.forEach((link) => {
  link.addEventListener('mouseenter', ({ target }) => {
    const tooltip = target.nextElementSibling;
    if (target.previousElementSibling) {
      const name = target.previousElementSibling;
      name.classList.add('hidden_active')
    }
    tooltip.classList.add('visible_active');
  });
  link.addEventListener('mouseleave', ({ target }) => {
    const tooltip = target.nextElementSibling;
    if (target.previousElementSibling) {
      const name = target.previousElementSibling;
      name.classList.remove('hidden_active')
    }
    tooltip.classList.remove('visible_active');
  });
});