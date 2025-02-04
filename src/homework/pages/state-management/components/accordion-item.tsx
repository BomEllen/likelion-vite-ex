import { tm } from '@/utils/tw-merge';

export interface AccordionItemType {
  id: string;
  title: string;
  children: React.ReactNode;
  open?: boolean;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onUpdate?: () => void;
}

function AccordionItem({
  title,
  children,
  open = false,
  onUpdate,
}: AccordionItemProps) {
  const handleToggle = () => {
    onUpdate?.();
  };

  return (
    <div className={tm('flex flex-col space-y-2 w-full', 'mt-2 mb-4')}>
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'text-xl font-medium text-slate-800',
          'hover:text-primary-500'
        )}
        onClick={handleToggle}
      >
        {title}
      </button>
      <div
        className={tm(
          { hidden: !open },
          'text-sm text-slate-800 leading-[1.5]',
          '*:mb-2',
          // [from]
          'opacity-0 -translate-y-2 h-0',
          // @staring-style
          'starting:opacity-0 starting:-translate-y-2 starting:h-0',
          // 전환(transition)
          'transition-all transition-discrete duration-400 ease-in-out',
          // [to]
          { 'opacity-100 translate-y-0 h-30': open }
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default AccordionItem;
