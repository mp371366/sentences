import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return <>
    <p>Hello on sentences web server!</p>
    <Link to="/random">View random sentence</Link>
    <p>or</p>
    <Link to="/add">add some</Link>
  </>;
}

export default Home;
