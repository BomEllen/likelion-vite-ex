import { createClient } from '@supabase/supabase-js';
import type { Database, Tables, TablesInsert, TablesUpdate } from './schema';

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
);

export type MemoItem = Tables<'memo-list'>;

export type MemoItemInsert = TablesInsert<'memo-list'>;

export type MemoItemUpdate = TablesUpdate<'memo-list'>;
