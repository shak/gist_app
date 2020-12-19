import React, { useEffect, useState } from 'react';

import { loadGistsByUser } from '../models/github.js';

const GistList = () => {
  const [data, setData] = useState({ gists: [] });

  useEffect(async () => {
    const gists = await loadGistsByUser('shak');

    setData({ gists });
  }, []);

  return (
    <div className="column">
      <ul>
        {data.gists.map(gist => (
          <li key={gist.id}>
            {gist.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GistList;