import PokemonLayout from './pokemon-layout';

function PokemonError() {
  return (
    <PokemonLayout className="border-red-600">
      <p role="alert" className="text-red-600 font-semibold">
        오류가 발생했습니다. 😥
      </p>
    </PokemonLayout>
  );
}

export default PokemonError;
