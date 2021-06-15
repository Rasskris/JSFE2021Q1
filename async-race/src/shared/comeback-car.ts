const comebackCarToStart = (id: number): void => {
  const carElement = document.getElementById(`car-${id}`) as HTMLDivElement;

  carElement.setAttribute('style', 'left: 100px');
};

export default comebackCarToStart;
