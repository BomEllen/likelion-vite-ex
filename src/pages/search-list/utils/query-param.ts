// 쿼리 스트링(Query String)
// 예) ?view=search-list&q=red

const QUERY_KEY = 'q';

// 읽기
export function getQueryParam() {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(QUERY_KEY);
}

// 쓰기(추가, 수정)
export function setQueryParam(queryValue: string) {
  const url = new URL(location.href);
  url.searchParams.set(QUERY_KEY, queryValue);
  history.pushState(null, '', url);
}

// 삭제
export function deleteQueryParam() {
  const url = new URL(location.href);
  url.searchParams.delete(QUERY_KEY);
  history.pushState(null, '', url);
}
