import { useRef, useEffect } from 'react';

function usePrev<T>(value: T) {
  const prevRef = useRef<T>(null);

  useEffect(() => {
    if (prevRef.current !== value) {
      prevRef.current = value;
    }
  }, [value]);

  return prevRef.current;
}

export default usePrev;
