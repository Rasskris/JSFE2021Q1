const closeModalWindow = (): void => {
  const modalWindow = document.querySelector('.modal') as HTMLDivElement;
  modalWindow.style.display = 'none';
};

export default closeModalWindow;