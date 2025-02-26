import Container from '@/components/container';
import GlobalNav from '@/components/global-nav';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

function CommonLayout() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      <GlobalNav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default CommonLayout;
