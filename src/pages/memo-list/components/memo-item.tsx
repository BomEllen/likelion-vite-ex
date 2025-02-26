import { tm } from '@/utils/tw-merge';
import { EditOne, EditOneSolid, TrashOne } from '@mynaui/icons-react';
import type {
  MemoItem as MemoItemType,
  MemoItemUpdate,
} from '../lib/supabase-client';
import { deleteMemoItem, editMemoItem } from '../lib/api';
import { useEffect, useRef, useState } from 'react';
import Loading from './loading';
import delay from '@/utils/delay';

interface MemoItemProps {
  item: MemoItemType;
}

function MemoItem({ item }: MemoItemProps) {
  // [관심사] 삭제 상태와 업데이트 핸들러
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await delay(2000);
    await deleteMemoItem(item.id);
    setIsDeleting(false);
  };

  // [관심사] 수정 상태와 업데이트 핸들러
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      titleRef.current?.focus();
    }
  }, [isEditing]);

  const editButtonLabel = isEditing ? '저장' : '수정';

  const handleChangeEditMode = () => {
    setIsEditing(true);
  };

  const handleSaveMemo = async () => {
    const titleElement = titleRef.current!;
    const contentElement = contentRef.current!;
    const currentTime = new Date().toISOString();

    const willEditMemoItem = {
      ...item,
      title: titleElement.textContent,
      content: contentElement.textContent,
      updated_at: currentTime,
    } as MemoItemUpdate;

    setIsSaving(true);
    await delay(900);
    await editMemoItem(willEditMemoItem);
    // 서버에 저장한 후 모드 변경
    setIsSaving(false);
    setIsEditing(false);
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  return (
    <li
      className={tm(
        'flex flex-col gap-1.5 p-4 bg-react text-white rounded-sm',
        { 'relative bg-react/70': isDeleting || isSaving }
      )}
    >
      {(isDeleting || isSaving) && (
        <Loading
          label={isSaving ? '저장 중...' : '삭제 중...'}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10"
        />
      )}

      <h3
        ref={titleRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
        className="font-light tracking-wide text-xl text-sky-500"
      >
        {item.title}
      </h3>
      <p
        ref={contentRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
        className="flex-1 text-sm text-slate-400 leading-relaxed"
      >
        {item.content}
      </p>
      <div role="group" className="flex gap-1">
        <button
          type="button"
          aria-label={editButtonLabel}
          title={editButtonLabel}
          onClick={!isEditing ? handleChangeEditMode : handleSaveMemo}
          className={tm(
            'cursor-pointer',
            'size-5 opacity-75 hover:opacity-100'
          )}
        >
          {!isEditing ? <EditOne size={20} /> : <EditOneSolid size={20} />}
        </button>
        <button
          type="button"
          aria-label="삭제"
          onClick={handleDelete}
          className={tm(
            'cursor-pointer',
            'size-5 opacity-75 hover:opacity-100'
          )}
        >
          <TrashOne size={20} />
        </button>
      </div>
    </li>
  );
}

export default MemoItem;
