import delay from '@/utils/delay';
import { useEffect, useState } from 'react';
import { Edit, Spinner } from '@mynaui/icons-react';
import { editRecipe, getRecipes } from '../lib/recipes';
import type { Recipe, Recipes } from '../types';
import SubmitButton from './SubmitButton';
import { tm } from '@/utils/tw-merge';

function RecipeEdit() {
  const [data, setData] = useState<null | Recipes>(null);

  const startIndex = 3;
  const limit = 5;
  const randomIndex = Math.floor(Math.random() * limit);

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

  // 레시피 수정 요청
  const handleEdit = async (formData: FormData) => {
    await delay();

    // <form> 내부 데이터 가져오기
    const editRecipeName = formData.get('recipe') as string;

    let willEditRecipe = null;

    // 현재 화면에 표시된 레시피 아이템 중 하나
    if (data?.recipes) {
      willEditRecipe = data.recipes.at(randomIndex);
    }

    // 서버에 데이터 추가 요청
    const editedRecipe = await editRecipe({
      id: willEditRecipe?.id ?? 0,
      name: editRecipeName,
    });

    console.log(editedRecipe);

    // 서버의 응답을 받아서, 클라이언트 앱 화면 업데이트 요청
    if (data) {
      const nextData: Recipes = {
        ...data,
        recipes: data.recipes.map((recipe) => {
          return recipe.id === editedRecipe.id ? editedRecipe : recipe;
        }),
      };

      setData(nextData);
    }
  };

  return (
    <article>
      <h4 className="text-lg font-medium">레시피 아이템 수정</h4>
      <form action={handleEdit} className="flex items-center">
        <input
          type="text"
          name="recipe"
          className="bg-white py-1 px-2 placeholder:text-sm"
          aria-label="레시피"
          placeholder="수정할 레시피 이름"
        />
        <SubmitButton label="수정">
          <Edit size={24} />
        </SubmitButton>
      </form>

      {!data && (
        <div role="alert" aria-label="로딩 중...">
          <Spinner size={24} className="animate-spin opacity-50" />
        </div>
      )}

      <ul className="flex flex-col gap-2 my-2">
        {data?.recipes?.map((item: Recipe, index: number) => (
          <li
            key={item.id}
            className={tm(
              'p-2 border-1 border-slate-400 rounded hover:bg-zinc-200/50',
              {
                'border-blue-600 text-blue-700': index === randomIndex,
              }
            )}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default RecipeEdit;
