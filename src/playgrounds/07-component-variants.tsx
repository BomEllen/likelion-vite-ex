import { useState } from 'react';

import Nav from '@/homework/components/nav';
import HomeworkSignInForm from '@/homework/pages/sign-in';
import HomeworkSignUpForm from '@/homework/pages/sign-up';
import { getUIView, type UIView } from '@/homework/lib/ui-view';
import DS_Button from '@/design-system/button';

function Playground() {
  const [uiView] = useState<UIView>(getUIView);
  const isSignInView = uiView === 'signin';

  return (
    <section className="Playground bg-euid-gray-200 wrapper">
      <h1>플레이그라운드</h1>
      <Nav />

      {isSignInView ? <HomeworkSignInForm /> : <HomeworkSignUpForm />}

      <article
        hidden
        className="flex flex-col space-x-2 my-10 items-center justify-center"
      >
        <h2 className="sr-only">컴포넌트 변형(variants)</h2>
        <div role="group" className="flex gap-4 mt-4">
          <DS_Button size="small">저장</DS_Button>
          <DS_Button>저장</DS_Button>
          <DS_Button intent="secondary">취소</DS_Button>
          <DS_Button intent="secondary" disabled>
            편집
          </DS_Button>
        </div>
      </article>
    </section>
  );
}

export default Playground;
