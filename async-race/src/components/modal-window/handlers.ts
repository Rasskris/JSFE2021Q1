const closeModalWindow = (): void => {
  const modalWindow = document.getElementById('modal') as HTMLDivElement;

  modalWindow.style.display = 'none';
};

export default closeModalWindow;
