import Heading from '@/components/heading';
import Section from '@/components/section';
import useProtectedRoute from '@/hooks/useProtectedRoute';
import { useNavigate } from 'react-router';

function DashboardPage() {
  useProtectedRoute();

  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log('로그아웃');
    navigate('/');
  };

  return (
    <Section level={2} className="flex flex-col gap-2">
      <Heading className="text-2xl font-medium">대시보드</Heading>
      <p>인증된 사용자만 접근 가능한 페이지입니다.</p>
      <form>
        <button
          type="submit"
          className="py-1.5 px-3 bg-white text-black rounded-sm font-medium"
          formAction={handleSignOut}
        >
          로그아웃
        </button>
      </form>
    </Section>
  );
}

export default DashboardPage;
