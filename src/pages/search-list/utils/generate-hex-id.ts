import getRandom from './getRandom';

const hexChar = '0123456789abcdef';

const generateHexId = (length = 6) => {
  const hexId = Array(length)
    .fill(null)
    .map(() => hexChar[getRandom(hexChar.length)])
    .join('');

  return hexId;
};

export default generateHexId;
