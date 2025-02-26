import { memo } from 'react';

function ColorContextSetter({
  setColor,
}: {
  setColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <button
      type="button"
      className="cursor-pointer my-2 p-3 bg-black text-white font-bold rounded-sm"
      onClick={() => setColor(getRandomHexColor())}
    >
      change color
    </button>
  );
}

export default memo(ColorContextSetter);

function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
