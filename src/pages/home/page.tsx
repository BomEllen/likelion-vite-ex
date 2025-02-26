import Heading from '@/components/heading';
import Section from '@/components/section';
import Title from '@/components/title';

function HomePage() {
  return (
    <>
      <Title>홈</Title>
      <Section level={2} className="px-5">
        <Heading className="text-2xl font-medium">
          싱글 페이지 앱(React Router 활용)
        </Heading>
      </Section>
    </>
  );
}

export default HomePage;
