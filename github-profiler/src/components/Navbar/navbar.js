import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function TopBar() {
  return (
    <Navbar bg="light">
        <Navbar.Brand className="my-0" href="/"><h3>Developer Profiler</h3></Navbar.Brand>
    </Navbar>
  );
}

export default TopBar;