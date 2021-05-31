const checkEqualCards = (): boolean => {
  const cards = document.querySelectorAll('.card-container');
  return Array.from(cards).every((card) => card.classList.contains('equal'));
};

export default checkEqualCards;