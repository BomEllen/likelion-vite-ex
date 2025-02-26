// 스토리지 데이터 읽기
export const getStorage = <T>(key: string, storage = localStorage) => {
  console.log(storage);

  const storageData = storage.getItem(key);
  return storageData ? (JSON.parse(storageData) as T) : undefined;
};

// 스토리지 데이터 쓰기
export const setStorage = <T>(
  key: string,
  value: T,
  storage = localStorage
) => {
  storage.setItem(key, JSON.stringify(value));
};

// 스토리지 데이터 제거
export const removeStorage = (key: string, storage = localStorage) => {
  storage.removeItem(key);
};
