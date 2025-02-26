import { useRef, useState, useEffect } from 'react';

function useInView<T extends HTMLElement>({
  root = null,
  threshold = 0,
  rootMargin = '0px',
  once = false,
}: IntersectionObserverInit & { once?: boolean } = {}): [
  React.RefObject<T | null>,
  boolean,
] {
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          const { isIntersecting } = entry;

          if (once) {
            if (isIntersecting) setIsIntersecting(true);
            return;
          }

          setIsIntersecting((prevValue) =>
            prevValue !== isIntersecting ? isIntersecting : prevValue
          );
        },
        {
          // null인 경우, 뷰포트를 루트로 사용
          root,
          // 0.1인 경우, 요소의 10%가 보일 때 교차 이벤트 트리거
          threshold,
          // '-50px'인 경우, 요소가 루트에 들어오기 50픽셀 전에 교차 이벤트 트리거
          rootMargin,
        }
      );
    }

    if (elementRef.current) {
      console.log('옵저브(관측) 시작');
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      console.log('옵저브(관측) 해제');
      observerRef.current?.disconnect();
    };
  }, [root, threshold, rootMargin, once]);

  return [elementRef, isIntersecting];
}

export default useInView;
