import { useState } from 'react';
import { getView } from '@/router/manage-view';
import ReactPingIcon from '@/components/react-ping-icon';
import Nav from '@/components/nav';
import Router from '@/router';

function Playground() {
  const [route, setRoute] = useState(getView);

  return (
    <section className="Playground bg-euid-gray-200 wrapper">
      <h1 lang="en" className="flex items-center gap-2 font-normal text-react">
        <ReactPingIcon size={24} /> Playground
      </h1>
      <Nav onChangeRoute={setRoute} />
      <Router route={route} />
    </section>
  );
}

export default Playground;
