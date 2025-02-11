function debounce<T = unknown>(
  callback: (...args: T[]) => void,
  timeout = 200
) {
  let cleanup: ReturnType<typeof setTimeout>;

  return (...args: T[]) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(() => callback(...args), timeout);
  };
}

export default debounce;
