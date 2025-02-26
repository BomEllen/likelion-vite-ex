import useDocumentTitle from '@/hooks/use-document-title';

function NotFound() {
  useDocumentTitle('404 Not Found 페이지를 찾을 수 없습니다.');
  return <div role="alert">페이지가 존재하지 않습니다.</div>;
}

export default NotFound;
