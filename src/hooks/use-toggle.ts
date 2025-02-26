import { useCallback, useEffect, useId } from 'react';
import usePersist from './use-persist';

function useToggle(
  initialValue = false,
  { persist = false, key = '@euid/toggle/', storage = localStorage } = {}
): [boolean | undefined, () => void, () => void] {
  const id = useId();

  const {
    data: isToggled,
    setData,
    saveToStorage,
    removeInStorage,
  } = usePersist(key + id, initialValue, { storage });

  useEffect(() => {
    if (persist && isToggled !== undefined) {
      saveToStorage(isToggled);
    }
  }, [persist, isToggled, saveToStorage]);

  const toggle = useCallback(() => {
    const nextData = !isToggled;
    setData(nextData);
    if (persist) saveToStorage(nextData);
  }, [isToggled, persist, saveToStorage, setData]);

  const clean = removeInStorage;

  return [isToggled, toggle, clean];
}

export default useToggle;
