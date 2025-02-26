import { useEffect, useId, useState } from 'react';
import { Recipes } from '../types';
import { getRecipes } from '../lib/recipes';
import { Spinner } from '@mynaui/icons-react';
import delay from '@/utils/delay';

function RecipeList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<null | Recipes>(null);

  const startIndexId = useId();
  const limitId = useId();

  const [startIndex, setStartIndex] = useState(0);
  const [limit, setLimit] = useState(1);

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    getRecipes({ startIndex, limit, fields: 'name,rating' })
      .then(async (data) => {
        if (!ignore) {
          await delay(Math.random() * 1000);
          setData(data);
        }
      })
      .catch((error: Error) => {
        if (!ignore) {
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [startIndex, limit]);

  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <label htmlFor={startIndexId}>요청 시작 인덱스</label>
          <input
            type="range"
            name="startIndex"
            id={startIndexId}
            min={0}
            max={50}
            value={startIndex}
            onChange={(e) => setStartIndex(Number(e.currentTarget.value))}
          />
          <output>{startIndex}</output>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor={limitId}>요청 갯수</label>
          <input
            type="range"
            name="limit"
            id={limitId}
            min={1}
            max={50}
            value={limit}
            onChange={(e) => setLimit(Number(e.currentTarget.value))}
          />
          <output>{limit}</output>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div role="alert">
          {loading && <Spinner size={32} className="animate-spin opacity-50" />}
        </div>
        {/* <h3 className="text-xl font-medium">Loading</h3>
        <p>로딩 상태(loading)</p>
        <pre className="rounded p-6 overflow-auto bg-react text-[#22d045] text-sm">
          {loading.toString()}
        </pre> */}
      </div>

      <details open={!loading} className="flex flex-col gap-1">
        <summary className="text-xl font-medium">Data</summary>
        <p>성취(fulfilled)</p>
        <pre className="rounded p-6 overflow-auto bg-react text-[#27a0cc] text-sm">
          {JSON.stringify(data, null, 2) ?? 'DATA'}
        </pre>
      </details>

      <details className="flex flex-col gap-1">
        <summary className="text-xl font-medium">Error</summary>
        <p>거부(rejected)</p>
        <pre className="rounded p-6 overflow-auto bg-react text-[#f0439f] text-sm">
          {error ? error.message : 'ERROR'}
        </pre>
      </details>
    </>
  );
}

export default RecipeList;
