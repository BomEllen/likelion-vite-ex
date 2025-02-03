import { tm } from '@/utils/tw-merge';
import { useState } from 'react';

function StateManagement() {
  return (
    <section>
      <h2 className="sr-only">상태 관리</h2>
      <AccordionItem title="넷플릭스는 무엇인가요?">
        <p>
          넷플릭스는 각종 수상 경력에 빛나는 시리즈, 영화, 애니메이션,
          다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한 수천 종의
          디바이스에서 시청할 수 있는 스트리밍 서비스입니다.
        </p>
        <p>
          저렴한 월 요금으로 원하는 시간에 원하는 만큼 즐길 수 있습니다.
          무궁무진한 콘텐츠가 준비되어 있으며 매주 새로운 시리즈와 영화가
          제공됩니다.
        </p>
      </AccordionItem>
      <AccordionItem title="넷플릭스는 요금은 얼마인가요?">
        <p>
          스마트폰, 태블릿, 스마트 TV, 노트북, 스트리밍 디바이스 등 다양한
          디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요. 멤버십 요금은
          월 5,500원부터 17,000원까지 다양합니다. 추가 비용이나 약정이 없습니다.
        </p>
      </AccordionItem>
    </section>
  );
}

export default StateManagement;

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => setIsVisible((v) => !v);

  return (
    <div className="flex flex-col space-y-0.5">
      <button type="button" onClick={handleToggle}>
        {title}
      </button>
      <div className={tm({ hidden: !isVisible })}>{children}</div>
    </div>
  );
}
