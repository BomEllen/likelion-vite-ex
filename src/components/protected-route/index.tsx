import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  isAllowed?: boolean;
  redirectPath?: string;
  children: React.ReactNode;
}

function ProtectedRoute({
  isAllowed = false,
  redirectPath = '/',
  children,
}: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
