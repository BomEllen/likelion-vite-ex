import { createClient } from '@supabase/supabase-js';
import type { Database, Tables, TablesInsert, TablesUpdate } from './schema';

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
);

// Database 타입을 통해 메모 아이템 타입 추출 방법
// export type MemoItem = Database['public']['Tables']['memo-list']['Row'];

// 단축된 방법 (별도 제공)
export type MemoItem = Tables<'memo-list'>;

export type MemoItemInsert = TablesInsert<'memo-list'>;

export type MemoItemUpdate = TablesUpdate<'memo-list'>;
