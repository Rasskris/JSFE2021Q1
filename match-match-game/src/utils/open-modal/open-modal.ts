const openModalWindow = (): void => {
  const modalWindow = document.querySelector('.modal') as HTMLDivElement;
  modalWindow.style.display = 'block';
};

export default openModalWindow;