import React from 'react';
import GistList from './Gist/List.js';

const App = () =>
  <div className="wrapper">
    <header>Gist Application</header>
    <section>
      <GistList className="col" />
    </section>
  </div>

export default App;