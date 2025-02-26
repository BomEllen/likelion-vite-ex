import { tm } from '@/utils/tw-merge';

function PokemonLayout({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={tm(
        'flex flex-col justify-center items-center',
        'border-4 border-black/10 rounded-full',
        'h-42 transition-colors duration-250 ease-in-out ',
        'hover:border-black',
        className
      )}
    >
      {children}
    </figure>
  );
}

export default PokemonLayout;
