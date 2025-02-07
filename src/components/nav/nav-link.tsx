import { tm } from '@/utils/tw-merge';
import { getView, setView } from '@/router/manage-view';

type WithoutHref = Omit<React.ComponentProps<'a'>, 'href'>;
type OnChangeRoute = React.Dispatch<React.SetStateAction<string>>;

type NavLinkProps = WithoutHref & {
  href: string;
  onChangeRoute: OnChangeRoute;
  activeClassName?: string;
};

function NavLink({
  href,
  onChangeRoute,
  activeClassName = 'active',
  children,
  className,
  ...restProps
}: NavLinkProps) {
  const view = getView();
  const isActive = view.includes(href);

  const handleRoute = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 네이티브 이벤트 시스템 중단
    e.preventDefault();
    // 프로그래밍 방식 내비게이션 설정
    onChangeRoute(href);
    // Playground 컴포넌트의 상태 업데이트 요청
    setView(href);
  };

  return (
    <a
      href={`/?view=${href}`}
      onClick={handleRoute}
      className={tm({ [activeClassName]: isActive }, className)}
      aria-current={isActive ? 'page' : undefined}
      {...restProps}
    >
      {children}
    </a>
  );
}

export default NavLink;
