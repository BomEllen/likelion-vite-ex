import { useContext, createElement, memo } from 'react';

import HeadingsLevelContext from '@/contexts/level';

function Heading(props: React.ComponentProps<'h1'>) {
  const level = useContext(HeadingsLevelContext);

  if (level < 1) {
    throw new Error(
      'Heading 컴포넌트는 Section 컴포넌트 내부에서만 사용해야 합니다.'
    );
  }

  if (level > 6) {
    throw new Error(`<h${level}> 요소는 존재하지 않습니다.`);
  }

  return createElement(`h${level}`, props);
}

export default memo(Heading);
