import delay from '@/utils/delay';
import { PlusSolid, Spinner } from '@mynaui/icons-react';
import { useEffect, useState } from 'react';
import { addRecipe, getRecipes } from '../lib/recipes';
import type { Recipe, Recipes } from '../types';
import SubmitButton from './SubmitButton';

function RecipeCreate() {
  const [data, setData] = useState<null | Recipes>(null);

  useEffect(() => {
    let ignore = false;

    getRecipes({ startIndex: 1, limit: 3 }).then((data) => {
      if (!ignore) {
        setData(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  // 레시피 추가 요청
  const handleAdd = async (formData: FormData) => {
    await delay();

    // <form> 내부 데이터 가져오기
    const newRecipeName = formData.get('recipe') as string;

    // 서버에 데이터 추가 요청
    const newRecipe = await addRecipe({
      name: newRecipeName,
    });

    // 서버의 응답을 받아서, 클라이언트 앱 화면 업데이트 요청
    if (data) {
      const nextData: Recipes = {
        ...data,
        recipes: [newRecipe, ...data.recipes],
      };

      setData(nextData);
    }
  };

  return (
    <article>
      <h4 className="text-lg font-medium">레시피 아이템 추가</h4>
      <form action={handleAdd} className="flex items-center">
        <input
          type="text"
          name="recipe"
          className="bg-white py-1 px-2 placeholder:text-sm"
          aria-label="레시피"
          placeholder="추가할 레시피 이름"
        />
        <SubmitButton label="추가">
          <PlusSolid size={24} />
        </SubmitButton>
      </form>

      {!data && (
        <div role="alert" aria-label="로딩 중...">
          <Spinner size={24} className="animate-spin opacity-50" />
        </div>
      )}

      <ul className="flex flex-col gap-2 my-2">
        {data?.recipes?.map((item: Recipe) => (
          <li
            key={item.id}
            className="p-2 border-1 border-slate-400 rounded hover:bg-zinc-200/50"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default RecipeCreate;
