import { useId } from 'react';
import delay from '@/utils/delay';
import SendButton from './send-button';
import { addMemoItem } from '../lib/api';
import type { MemoItemInsert } from '../lib/supabase-client';

function CreateForm() {
  const handleAddMemo = async (formData: FormData) => {
    const id = Math.floor(Math.random() * 1000);
    const title = (formData.get('title') as string).trim();
    const content = (formData.get('content') as string).trim();

    const newMemoItem = {
      id,
      title,
      content,
    } as MemoItemInsert;

    await delay(1200);
    await addMemoItem(newMemoItem);
  };

  const titleId = useId();
  const contentId = useId();

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">메모 작성</h2>
      <form
        action={handleAddMemo}
        className="flex flex-col gap-2 border-3 border-react rounded-sm p-3"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor={titleId} className="font-medium">
            제목
          </label>
          <input
            type="text"
            name="title"
            id={titleId}
            placeholder="제목 작성"
            className="bg-react text-white py-1.5 px-2.5 rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={contentId} className="font-medium">
            내용
          </label>
          <textarea
            rows={3}
            name="content"
            id={contentId}
            placeholder="내용을 작성하세요."
            className="bg-react text-white py-1.5 px-2.5 rounded-sm"
          />
        </div>
        <SendButton />
      </form>
    </section>
  );
}

export default CreateForm;
