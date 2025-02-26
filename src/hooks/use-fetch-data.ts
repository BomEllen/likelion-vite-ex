import delay from '@/utils/delay';
import { useEffect, useState } from 'react';

export function useFetchData<T, E = Error>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const data = (await response.json()) as T;

        if (!ignore) {
          await delay(Math.floor(Math.random() * 1000));

          setLoading(false);
          setError(null);
          setData(data);
        }
      } catch (error) {
        if (!ignore) {
          setLoading(false);
          setError(error as E);
          setData(null);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { loading, error, data };
}
