import { useState, useEffect, useCallback } from 'react';

// 스토리지 데이터 읽기
const getStorage = <T>(key: string, storage = localStorage) => {
  const storageData = storage.getItem(key);
  return storageData ? (JSON.parse(storageData) as T) : undefined;
};

// 스토리지 데이터 쓰기
const setStorage = <T>(key: string, value: T, storage = localStorage) => {
  storage.setItem(key, JSON.stringify(value));
};

// 스토리지 데이터 제거
const removeStorage = (key: string, storage = localStorage) => {
  storage.removeItem(key);
};

function usePersist<T>(
  key: string,
  initialValue?: T,
  { changeOnSave = false, storage = localStorage } = {}
) {
  const [data, setData] = useState<T | undefined>(
    () => getStorage(key, storage) ?? initialValue
  );

  useEffect(() => {
    if (changeOnSave) setStorage(key, data);
  }, [key, data, changeOnSave, storage]);

  // useMemo: 함수를 포함해 모든 JS 값을 기억한다.
  // const saveToStorage = useMemo(
  //   () => (value: T) => setStorage(key, value, storage),
  //   [key, storage]
  // );

  // useCallback: 함수 값만 기억한다.
  // useMemo를 사용해 함수 값을 기억할 수도 있지만...
  // 코드 가독성 측면에서 함수 값인 경우 useCallback을 사용하세요.
  const saveToStorage = useCallback(
    (value: T) => setStorage(key, value, storage),
    [key, storage]
  );

  const removeInStorage = useCallback(
    () => removeStorage(key, storage),
    [key, storage]
  );

  return {
    data,
    setData,
    saveToStorage,
    removeInStorage,
  };
}

export default usePersist;
