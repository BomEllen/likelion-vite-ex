import Title from '@/components/title';
import { useFetchData } from '@/hooks/use-fetch-data';
import Loading from '../memo-list/components/loading';
import PokemonWithUseFetchData from './components/pokemon-with-use-fetch-data';
import PokemonWithUseQuery from './components/pokemon-with-use-query';
import type { PokemonList } from './types';

function CustomHookPage() {
  // 포켓몬 집합 정보 가져오기
  // 'https://pokeapi.co/api/v2/pokemon?offset=3&limit=10'

  const { loading, error, data } = useFetchData<PokemonList>(
    'https://pokeapi.co/api/v2/pokemon?offset=3&limit=28'
  );

  return (
    <>
      <Title>커스텀 훅</Title>
      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl mb-6">
          사용자 정의 훅 함수(Custom Hook) 활용
        </h2>

        <h3 className="text-xl font-medium">
          페이지에서 데이터 요청/응답 후, 화면 업데이트
        </h3>
        {loading && (
          <Loading size={48} label="포켓몬 리스트 데이터 로딩 중..." />
        )}
        {error && <div role="alert">{error.message}</div>}
        {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
        {!loading && data && <output>{data.results.length}</output>}

        <hr className="my-10" />

        <h3 className="text-xl font-medium mb-6">
          컴포넌트에서 데이터 요청/응답 후, 화면 업데이트
        </h3>
        <PokemonWithUseFetchData />
        <PokemonWithUseQuery />
      </section>
    </>
  );
}

export default CustomHookPage;
