import type { Pokemon } from '../types';

const fetchPokemonImpl = async (id: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data as Pokemon;
};

// Server Component + Client Component (e.g: Next.js, ...)
// Client Component (e.g: Vite, Create React App, ...)

// use() 함수를 클라이언트 컴포넌트에서 사용할 때 무한 루프에 빠지는 이유
// Suspense -> use(Promise) => [N]turn (Reqeust / Response)

// 클라이언트 캐시(Client Cache) : 데이터 메모리
// Suspense -> use(Promise) => Cache => [1]turn (Reqeust / Response)

const cache = new Map<number, Promise<Pokemon>>();

export const fetchPokemon = (id: number) => {
  const pokemonPromise = cache.get(id) ?? fetchPokemonImpl(id);
  cache.set(id, pokemonPromise);
  return pokemonPromise;
};
