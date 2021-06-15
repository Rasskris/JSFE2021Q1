const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  const countCharsColor = 6;

  let color = '#';

  for (let i = 0; i < countCharsColor; i += 1) {
    const hexadecimalSystem = 16;
    const randomIndex = Math.floor(Math.random() * hexadecimalSystem);
    color += letters[randomIndex];
  }

  return color;
};

export default getRandomColor;
