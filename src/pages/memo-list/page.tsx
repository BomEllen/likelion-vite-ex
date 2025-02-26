import Title from '@/components/title';
import type { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Loading from './components/loading';
import MemoList from './components/memo-list';
import { getMemoList, subscribe } from './lib/api';
import type { MemoItem } from './lib/supabase-client';
import useProtectedRoute from '@/hooks/useProtectedRoute';

function MemoListPage() {
  useProtectedRoute();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<null | MemoItem[]>(null);
  const [error, setError] = useState<null | PostgrestError>(null);

  useEffect(() => {
    let ignore = false;

    getMemoList()
      .then(({ error, data }) => {
        if (error) {
          throw error;
        }

        if (data && !ignore) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((error: PostgrestError) => {
        setError(error);
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    // 리얼타임 데이터베이스 변경을 구독
    const channel = subscribe((payload) => {
      console.log(payload);

      // 추가(INSERT), 수정(UPDATE), 삭제(DELETE)
      switch (payload.eventType) {
        case 'INSERT': {
          setData((data) => {
            const nextData = [...data!, payload.new];
            return nextData as MemoItem[];
          });
          break;
        }
        case 'UPDATE': {
          setData((data) => {
            const nextData = data!.map((item) =>
              item.id === payload.new.id ? payload.new : item
            );
            return nextData as MemoItem[];
          });
          break;
        }
        case 'DELETE': {
          setData((data) => {
            const nextData = data!.filter((item) => item.id !== payload.old.id);
            return nextData;
          });
        }
      }
    });

    return () => {
      // 리얼타임 데이터베이스 변경을 구독 취소
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      <Title>메모리스트 with Supabase</Title>
      <section>
        <h1 className="sr-only">메모 리스트 (with Supabase)</h1>
        {loading && <Loading />}
        {error && <div role="alert">{error.message}</div>}
        {data && <MemoList items={data} />}
      </section>
    </>
  );
}

export default MemoListPage;
