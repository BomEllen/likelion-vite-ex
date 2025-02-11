import { tm } from '@/utils/tw-merge';
import { ColorMoodItem } from '../types';
import generateGradient from '../utils/generate-gradient';
import { Heart, HeartSolid } from '@mynaui/icons-react';

interface CardProps {
  item: ColorMoodItem;
  onUpdate: (item: ColorMoodItem, isFavorited: boolean) => void;
}

function Card({ item, onUpdate }: CardProps) {
  // [파생된 상태] from Props
  const isFavorited = item.isFavorited;

  const handleChangeFavorite = () => {
    const nextIsFavorited = !isFavorited;
    onUpdate(item, nextIsFavorited);
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(slug);
  };

  const iconSize = 48;
  const slug = `/color-mood/${item.id}`;
  const buttonLabel = `즐겨찾기 ${isFavorited ? '제거' : '추가'}`;
  const gradientStyles = { background: generateGradient(item.id) };
  const Icon = isFavorited ? HeartSolid : Heart;

  return (
    <li className={tm('flex flex-col items-center gap-3')}>
      <figure
        className={tm('size-32 rounded-full', 'relative')}
        style={gradientStyles}
      >
        <button
          type="button"
          title={buttonLabel}
          aria-label={buttonLabel}
          onClick={handleChangeFavorite}
          className={tm(
            'cursor-pointer',
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'rounded-full '
          )}
        >
          <Icon size={iconSize} />
        </button>
      </figure>
      <a
        href={slug}
        className={tm('flex flex-col items-center gap-0')}
        onClick={handleLink}
      >
        <h4 className="text-[22px] font-semibold">{item.title}</h4>
        <p className="text-sm text-slate-700">{item.description}</p>
      </a>
    </li>
  );
}

export default Card;
