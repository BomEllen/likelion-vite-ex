import delay from '@/utils/delay';
import { tm } from '@/utils/tw-merge';
import { Spinner, Trash } from '@mynaui/icons-react';
import { useEffect, useState } from 'react';
import { deleteRecipe, getRecipes } from '../lib/recipes';
import type { Recipe, Recipes } from '../types';
import SubmitButton from './SubmitButton';

function RecipeDelete() {
  const [data, setData] = useState<null | Recipes>(null);

  const startIndex = 9;
  const limit = 4;

  useEffect(() => {
    let ignore = false;

    getRecipes({ startIndex, limit }).then((data) => {
      if (!ignore) {
        setData(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  // 레시피 삭제 요청
  const handleDelete = async (formData: FormData) => {
    await delay();

    // <form> 내부 데이터 가져오기
    const willDeleteRecipeName = formData.get('recipe') as string;

    const willDeleteRecipe = data?.recipes.find(
      (recipe) =>
        recipe.name.toLowerCase() === willDeleteRecipeName.toLowerCase().trim()
    );

    if (willDeleteRecipe) {
      const deletedRecipe = await deleteRecipe(willDeleteRecipe.id);

      if (data && deletedRecipe) {
        // 화면 업데이트 요청
        const nextData = {
          ...data,
          recipes: data.recipes.filter((recipe) => {
            return recipe.id !== deletedRecipe.id;
          }),
        };

        setData(nextData);
      }
    }
  };

  return (
    <article>
      <h4 className="text-lg font-medium">레시피 아이템 삭제</h4>
      <form action={handleDelete} className="flex items-center">
        <input
          type="text"
          name="recipe"
          className="bg-white py-1 px-2 placeholder:text-sm"
          aria-label="레시피"
          placeholder="삭제할 레시피 이름"
        />
        <SubmitButton label="삭제">
          <Trash size={24} />
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
            className={tm(
              'p-2 border-1 border-slate-400 rounded hover:bg-zinc-200/50'
            )}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default RecipeDelete;
