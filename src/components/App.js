import React from 'react';

import GistList from './GistList.js';

const App = () =>
  <div className="wrapper">
    <header>Gist Application</header>
    <section>
      <GistList className="col" />
    </section>
  </div>

export default App;