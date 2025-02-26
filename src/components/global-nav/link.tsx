import {
  NavLink as RR_NavLink,
  type To,
  type NavLinkRenderProps,
} from 'react-router';
import { tm } from '@/utils/tw-merge';

type NavLinkProps = Omit<React.ComponentProps<'a'>, 'href' | 'className'> & {
  to: To;
  className?: string | ((props: NavLinkRenderProps) => string);
};

function NavLink({ to, className, children, ...restProps }: NavLinkProps) {
  return (
    <RR_NavLink
      to={to}
      className={({ isActive }) => {
        const baseClasses = 'p-2 bg-black text-white';
        return tm(baseClasses, { 'text-blue-500': isActive }, className);
      }}
      {...restProps}
    >
      {children}
    </RR_NavLink>
  );
}

export default NavLink;
