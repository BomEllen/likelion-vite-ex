import Heading from '@/components/heading/with-level';
import Section from '@/components/section';
import Title from '@/components/title';
import { tm } from '@/utils/tw-merge';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PrintError from './components/error';

const sectionClasses = tm(
  'flex flex-col gap-2',
  'mt-2 p-8 rounded-md',
  'bg-indigo-900/20'
);

const headingClasses = tm('text-indigo-950 font-medium');

function AutoHeadingsLevelPage() {
  const [showLevel, setShowLevel] = useState(false);

  return (
    <>
      <Title>제목 자동 레벨 구성</Title>

      <ErrorBoundary FallbackComponent={PrintError}>
        <Section level={4} className={sectionClasses}>
          <Heading
            showLevel={showLevel}
            className={tm('text-3xl', headingClasses)}
          >
            섹셔닝 콘텐츠
          </Heading>
          <p>
            Section 컴포넌트에{' '}
            <code
              className={tm(
                'p-[3px]',
                'border rounded-sm',
                'text-[11px] align-[2px]',
                ' bg-indigo-50/20'
              )}
            >
              level
            </code>{' '}
            속성을 설정하면 해당 값으로 제목 레벨(level)이 설정됩니다.
          </p>

          <Section tag="article" className={sectionClasses}>
            <Heading
              showLevel={showLevel}
              className={tm('text-2xl', headingClasses)}
            >
              제목 레벨 자동 설정
            </Heading>
            <p>
              제목 레벨 토글(toggle heading level) 버튼을 누르면 제목 레벨을
              화면에 표시하거나 감춥니다.
            </p>
            <button
              type="button"
              onClick={() => setShowLevel((l) => !l)}
              className={tm(
                'cursor-pointer',
                'self-start px-2 py-1.5 rounded-sm',
                'mb-1',
                'bg-indigo-950 text-white font-medium text-xs'
              )}
            >
              제목 레벨 {showLevel ? '감춤' : '표시'}
            </button>

            <Heading
              showLevel={showLevel}
              className={tm('text-2xl', headingClasses)}
            >
              같은 레벨 제목
            </Heading>
            <p>
              Section 컴포넌트 내부에 Heading 컴포넌트가 여러 번 사용되면 해당
              컴포넌트는 동일한 제목 레벨을 가집니다.
            </p>

            <Section className={sectionClasses}>
              <Heading
                showLevel={showLevel}
                className={tm('text-xl', headingClasses)}
              >
                사용자 경험(
                <abbr className="cursor-help" title="User eXperience">
                  UX
                </abbr>
                ) 개선
              </Heading>
              <p>
                섹셔닝 콘텐츠의 제목 레벨이 자동 설정되면 개발자 경험(
                <abbr className="cursor-help" title="Developer eXperience">
                  DX
                </abbr>
                )이 향상되고, 검색 엔진 최적화(
                <abbr
                  className="cursor-help"
                  title="Search Engine Optimization"
                >
                  SEO
                </abbr>
                ), 접근성(
                <abbr className="cursor-help" title="Accessibility">
                  A11Y
                </abbr>
                )을 높여 사용자 경험을 향상시킵니다.
              </p>
            </Section>
          </Section>
        </Section>
      </ErrorBoundary>
    </>
  );
}

export default AutoHeadingsLevelPage;
