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

const handleReset = () => {
  const { filter } = initState;
  Object.keys(filter).forEach((prop) => {
    const { value, suffix } = filter[prop];
    document.documentElement.style.setProperty(`--${prop}`, `${value}${suffix}`);
    const filterInput = document.querySelector(`input[name=${prop}]`);
    filterInput.value = value;
    const filterOutput = filterInput.nextElementSibling;
    filterOutput.value = value;
  });
};

const images = ['01', '02', '03', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
];

let imgIndex = 0;

const viewImage = (img) => {
  const currentImg = document.querySelector('img');
  img.addEventListener('load', () => {
    currentImg.replaceWith(img);
    imgIndex += 1;
  });
  img.addEventListener('error', () => {
    const errMsg = document.createElement('output');
    errMsg.value = `Error. Image can not be loaded.`;
    document.querySelector('.editor').append(errMsg);
  });
};

const handleNext = () => {
  const imgNum = imgIndex % images.length;
  const timesOfDay = getTimesOfDay();
  const imgSrc = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay}/${images[imgNum]}.jpg`;
  const nextImg = new Image();
  nextImg.crossOrigin = 'anonymous';
  nextImg.alt = 'Sample Image';
  nextImg.src = imgSrc;
  viewImage(nextImg);
};

const handleLoad = ({ target }) => {
  const file = target.files[0];
  const reader = new FileReader();
  reader.onload = function() {
    const img = new Image();
    img.src = reader.result;
    viewImage(img);
  };
  reader.readAsDataURL(file);
};