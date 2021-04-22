const initState = {
  filter: {
    blur: { value: 0, suffix: 'px' },
    invert: { value: 0, suffix: '%' },
    sepia: { value: 0, suffix: '%' },
    saturate: { value: 100, suffix: '%'},
    hue: { value: 0, suffix: 'deg'},
  },
};

const getTimesOfDay = () => {
  const hour = new Date().getHours();
  
  let timesOfDay;
  if (hour >= 6 && hour <= 11) {
    timesOfDay = 'morning';
  } else if (hour >= 12 && hour <= 17) {
    timesOfDay = 'day';
  } else if (hour >= 18 && hour <= 23) {
    timesOfDay = 'evening';
  } else if (hour >= 0 && hour <= 5) {
    timesOfDay = 'night';
  }

  return timesOfDay;
};

const filters = document.querySelector('.filters');
filters.addEventListener('input', ({ target }) => {
  const siblingEl = target.nextElementSibling;
  siblingEl.value = target.value;
  const suffix = target.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${target.name}`, `${target.value}${suffix}`);
});