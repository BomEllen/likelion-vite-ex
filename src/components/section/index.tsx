import { memo, useContext } from 'react';
import HeadingsLevelContext from '@/contexts/level';

type SectioningContent = React.ComponentProps<'section'>;

type SectionProps = SectioningContent & {
  tag?: 'section' | 'article';
  level?: number;
};

function Section({
  tag: Component = 'section',
  level: userDefinedLevel,
  children,
  ...restProps
}: SectionProps) {
  const contextLevel = useContext(HeadingsLevelContext);
  const level = userDefinedLevel ?? contextLevel + 1;

  return (
    <HeadingsLevelContext value={level}>
      <Component {...restProps}>{children}</Component>
    </HeadingsLevelContext>
  );
}

export default memo(Section);
