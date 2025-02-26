import { useAuthStore } from '@/stores/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function useProtectedRoute() {
  // 인증되지 않은 사용자가 접근을 시도할 경우
  // [ useNavigate ] 훅을 사용하면 프로그래밍 방식으로 다른 페이지로 이동 시킬 수 있습니다.
  const navigate = useNavigate();
  const isSignin = useAuthStore((s) => s.isSignin);

  // 페이지가 로드된 상황에서 사용자와 상호작용 없이
  useEffect(() => {
    // 인증 상태를 확인한 후, 인증되지 않았을 경우 로그인 페이지로 이동 (리디렉션)
    if (!isSignin) {
      navigate('/dashboard/signin', { state: { prevHref: location.href } });
    }
  }, [isSignin, navigate]);
}

export default useProtectedRoute;
