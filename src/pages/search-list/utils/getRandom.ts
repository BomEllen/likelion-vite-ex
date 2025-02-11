const getRandom = (max = 9, min = 0) => {
  return Math.floor(Math.random() * max - min) + min;
};

export default getRandom;
