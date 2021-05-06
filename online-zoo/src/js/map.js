const mapImage = document.querySelector('.map-wrapper-2');
const wrapper = document.querySelector('.map-wrapper-1');
const headerElem = document.querySelector('.header-map');
const footerElem = document.querySelector('.footer-map');
const zoomInButton = document.querySelector('.zoom-in');
const zoomOutButton = document.querySelector('.zoom-out');

let topIndent = 0;
let leftIndent = 0;

const calculateCoords = (e, elem) => {
  const box = elem.getBoundingClientRect();
  console.log(box.width, box.height)
  topIndent = e.pageY - box.top;
  leftIndent = e.pageX - box.left;
};

const moveAt = (e) => {
  mapImage.style.cursor = 'move';
  if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
  mapImage.style.left = e.pageX - leftIndent + 'px';
  if (e.pageX >= wrapper.offsetWidth) {
    stopDrag();
  } else if (e.pageX <= 0) {
    stopDrag();
  }
  console.log(topIndent)
  mapImage.style.top = e.pageY - (79 - pageYOffset) - topIndent + 'px';
};

const stopDrag = () => {
  mapImage.style.cursor = 'default';
  document.removeEventListener('mousemove', moveAt);
  mapImage.removeEventListener('mouseup', stopDrag);
};

const map = document.querySelector('.map__container');

let counter = 1;
const handleZoomIn = ({ target }) => {
  if (counter > 1) {
    target.classList.remove('map-btn_non-active');
    counter -= 0.5;
    map.style.transform = `scale(${counter})`;
    zoomOutButton.classList.remove('map-btn_non-active');
  } else {
    target.classList.add('map-btn_non-active');
  }
};
const handleZoomOut = ({ target }) => {
  if (counter < 3.5) {
    target.classList.remove('map-btn_non-active');
    counter += 0.5;
    map.style.transform = `scale(${counter})`
    zoomInButton.classList.remove('map-btn_non-active');
  } else {
    target.classList.add('map-btn_non-active');
  }
};

const callListener = () => {
  if (!mapImage) {
    return;
  }
  mapImage.addEventListener('mousedown', (e) => {
    if (mapImage.width <= wrapper.offsetWidth && mapImage.height <= wrapper.offsetHeight) {
      return;
    }
    mapImage.style.cursor = 'grab';
    calculateCoords(e, mapImage);
    moveAt(e);
  
    document.addEventListener('mousemove', moveAt);
    mapImage.addEventListener('mouseup', stopDrag);
  });

  mapImage.ondragstart = function() {
    return false;
  };

  headerElem.addEventListener('mouseenter', stopDrag);
  footerElem.addEventListener('mouseenter', stopDrag);

  zoomInButton.addEventListener('click', handleZoomIn);
  zoomOutButton.addEventListener('click', handleZoomOut);
};
callListener();