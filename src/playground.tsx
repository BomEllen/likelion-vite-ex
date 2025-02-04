import { useState } from 'react';
import Nav from '@/homework/components/nav';
import { getUIView } from '@/homework/lib/ui-view';
import StateManagement from '@/homework/pages/state-management';
import SignInForm from '@/homework/pages/sign-in';
import SignUpForm from '@/homework/pages/sign-up';
import TicTacToe from './homework/pages/tic-tac-toe';

const getViewElement = (uiView: string) => {
  let viewElement: React.ReactElement | null = null;

  switch (uiView) {
    case 'signin': {
      viewElement = <SignInForm />;
      break;
    }
    case 'signup': {
      viewElement = <SignUpForm />;
      break;
    }
    case 'state-management': {
      viewElement = <StateManagement />;
      break;
    }
    case 'tic-tac-toe': {
      viewElement = <TicTacToe />;
      break;
    }
  }

  return viewElement;
};

function Playground() {
  const [uiView] = useState<string>(getUIView);
  const viewElement = getViewElement(uiView);

  return (
    <section className="Playground bg-euid-gray-200 wrapper">
      <h1>플레이그라운드</h1>
      <Nav />
      {viewElement}
    </section>
  );
}

export default Playground;
