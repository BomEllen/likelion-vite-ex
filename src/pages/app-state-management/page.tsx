import Heading from '@/components/heading';
import Section from '@/components/section';
import Title from '@/components/title';
import Counter from './components/counter';
import { useAuthStore } from '@/stores/auth';

function AppStateManagementPage() {
  const isSignin = useAuthStore((s) => s.isSignin);

  return (
    <>
      <Title>앱 상태 관리</Title>

      <Section level={2} className="flex flex-col gap-4">
        <Heading className="text-2xl font-medium">
          애플리케이션 상태 관리 (with Zustand)
        </Heading>
        <p>로그인: {isSignin.toString()}</p>
        <Counter />
      </Section>
    </>
  );
}

export default AppStateManagementPage;
