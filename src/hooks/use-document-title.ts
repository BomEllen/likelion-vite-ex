import { useEffect } from 'react';

function useDocumentTitle(
  title: string,
  base = 'React 플레이그라운드',
  divider = '|'
) {
  useEffect(() => {
    if (base) {
      document.title = `${title} ${divider} ${base}`;
    } else {
      document.title = title;
    }
  }, [title, base, divider]);
}

export default useDocumentTitle;
