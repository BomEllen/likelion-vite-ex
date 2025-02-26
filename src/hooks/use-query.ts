import { useState, useEffect } from 'react';

const $$cache = new Map<string, unknown>();

type Status = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface UseQueryParams<T> {
  queryKey: string;
  queryFn: () => Promise<Response>;
  initialData?: T;
}

function useQuery<T>({ queryKey, queryFn, initialData }: UseQueryParams<T>) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | undefined>(initialData);

  const queryFnKey = `FN::${queryKey}`;
  let memoQueryFn: typeof queryFn = queryFn;

  if ($$cache.has(queryFnKey)) {
    memoQueryFn = $$cache.get(queryFnKey) as typeof queryFn;
  } else {
    $$cache.set(queryFnKey, memoQueryFn);
  }

  useEffect(() => {
    if ($$cache.has(queryKey)) {
      const memoizedData = $$cache.get(queryKey) as T;
      setData(memoizedData);
      return;
    }

    let ignore = false;
    setStatus('pending');

    memoQueryFn()
      .then(async (response) => {
        if (!response.ok) {
          const { status, statusText } = response;
          throw new Error(`[${statusText}] ${status}`);
        }

        const data = await response.json();
        return data as T;
      })
      .then((data) => {
        if (!ignore) {
          setStatus('fulfilled');
          setData(data);
          $$cache.set(queryKey, data);
        }
      })
      .catch((error) => {
        if (!ignore) {
          setStatus('rejected');
          setError(error as Error);
        }
      });

    return () => {
      ignore = true;
    };
  }, [queryKey, memoQueryFn]);

  const isLoading = status === 'pending';
  const isSuccessed = status === 'fulfilled';
  const isFailed = status === 'rejected';
  const isCached = $$cache.has(queryKey);

  return {
    data,
    error,
    status,
    isLoading,
    isSuccessed,
    isFailed,
    isCached,
    $$cache,
  };
}

export default useQuery;
