import { getPublicImage } from '@/utils/getPublic';
import { tm } from '@/utils/tw-merge';

function ReactPingIcon({ size = 20 }: { size?: number }) {
  const imagePath = getPublicImage('react.svg');
  
  return (
    <span className="relative">
      <img src={imagePath} alt="React" height={size} width={size} />
      <img
        role="presentation"
        className={tm(
          'absolute inset-0 animate-[ping_2s_ease-out_3s_infinite] opacity-45',
          'hover:animate-none'
        )}
        src={imagePath}
        alt=""
        height={size}
        width={size}
      />
    </span>
  );
}

export default ReactPingIcon;
