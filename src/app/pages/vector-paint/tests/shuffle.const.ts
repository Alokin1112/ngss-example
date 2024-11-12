export const shuffle = <T>(array: T[], seed: number): T[] => {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;

  const seededRandom = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  while (currentIndex != 0) {
    const randomIndex = Math.floor(seededRandom() * currentIndex);
    currentIndex--;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }
  return shuffledArray;
};