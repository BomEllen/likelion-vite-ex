const VIEW = 'view';

export const getView = () => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(VIEW) ?? 'signin';
};

export const setView = (route: string) => {
  const url = new URL(location.href);
  url.searchParams.set(VIEW, route);
  history.pushState({}, '', url);
};

const body = document.body;

export const resetActiveFocus = () => {
  if (!body.getAttribute('tabindex')) {
    body.setAttribute('tabindex', '-1');
  }

  body.focus();
};
