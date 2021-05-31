const calculateScore = (countCompare: number, countWrongCompare: number, seconds: number): number => {
  const result = (countCompare - countWrongCompare) * 100 - (seconds * 10);
  return result < 0 ? 0 : Math.floor(result);
}

export default calculateScore;