import { useState } from 'react';
import type { MemoItem } from '../lib/supabase-client';
import SearchedList from './searched-list';
import CreateForm from './create-form';
import SearchForm from './search-form';

interface MemoListProps {
  items: MemoItem[];
}

function MemoList({ items }: MemoListProps) {
  const [search, setSearch] = useState('');

  return (
    <div>
      <CreateForm />
      <hr className="my-5 border-black/40" />
      <SearchForm setSearch={setSearch} />
      <hr className="my-5 border-black/40" />
      <SearchedList items={items} search={search} />
    </div>
  );
}

export default MemoList;
