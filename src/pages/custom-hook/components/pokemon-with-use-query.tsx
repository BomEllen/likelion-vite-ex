import { tm } from '@/utils/tw-merge';
import Loading from '@/pages/memo-list/components/loading';
import type { Pokemon } from '../types';
import useQuery from '@/hooks/use-query';
import useInView from '@/hooks/use-in-view';

const pikachuQueryOptions = {
  queryKey: '@pokemon/pikachu',
  queryFn: () => fetch('https://pokeapi.co/api/v2/pokemon/25'),
};

const raichuQueryOptions = {
  queryKey: '@pokemon/raichu',
  queryFn: () => fetch('https://pokeapi.co/api/v2/pokemon/26'),
};

function PokemonWithUseQuery() {
  // 포켓몬 개별 정보 가져오기
  // 'https://pokeapi.co/api/v2/pokemon/1'

  const pihachu = useQuery<Pokemon>(pikachuQueryOptions);
  const raichu = useQuery<Pokemon>(raichuQueryOptions);

  const [figureRef, isInView] = useInView<HTMLImageElement>({ once: true });

  console.log({ isInView });

  return (
    <>
      <figure
        ref={figureRef}
        className={tm(
          'flex gap-5 justify-center items-center',
          'border-4 border-black/10',
          'rounded-full h-42',
          'transition-colors duration-250 ease-in-out',
          'hover:border-black'
        )}
      >
        {pihachu.isLoading && (
          <Loading size={48} label="포켓몬 데이터 로딩 중..." />
        )}
        {pihachu.error && <div role="alert">{pihachu.error.message}</div>}
        {!pihachu.isLoading && pihachu.data && (
          <img
            src={pihachu.data.sprites.front_default}
            alt={pihachu.data.name}
            title={pihachu.data.name}
            className="size-40"
          />
        )}
      </figure>
      <figure
        className={tm(
          'flex gap-5 justify-center items-center',
          'border-4 border-black/10',
          'rounded-full h-42',
          'transition-colors duration-250 ease-in-out',
          'hover:border-black'
        )}
      >
        {raichu.isLoading && (
          <Loading size={48} label="포켓몬 데이터 로딩 중..." />
        )}
        {raichu.error && <div role="alert">{raichu.error.message}</div>}
        {!raichu.isLoading && raichu.data && (
          <img
            src={raichu.data.sprites.front_default}
            alt={raichu.data.name}
            title={raichu.data.name}
            className="size-40"
          />
        )}
      </figure>
    </>
  );
}

export default PokemonWithUseQuery;
