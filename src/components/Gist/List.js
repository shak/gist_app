import React, {
  useEffect,
  useState,
  useReducer } from 'react';

import { isArray } from 'lodash';

import GithubAPIStatefulReducer, {
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_INIT } from '../../reducers/hooks/GithubAPIStatefulReducer';

import { loadGistsByUser } from '../../models/github.js';
import GistRow from './Row.js';

/**
 * GistList react functional component
 */
const GistList = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('rdeavila');

  const [state, dispatch] = useReducer(GithubAPIStatefulReducer, {
    isLoading: false,
    isError: false,
    data: [],
    message: null
  });

  useEffect(async () => {
    try {
      if (typeof search === 'string' && search.length > 0) {
        // trigger loading state
        dispatch({ type: FETCH_INIT });

        // attempt fetch from the API
        const response = await loadGistsByUser(search);

        if (isArray(response)) {
          dispatch({ type: FETCH_SUCCESS, payload: response });
        }
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  }, [search]); // bind to updates on search term

  return (
    <main className="column">
      <form
        onSubmit={event => {
          setSearch(query);
          event.preventDefault(); // prevent GET request from triggering on submit
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Github username"
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {state.message}
      {state.isLoading ? <div>Loading...</div> : ''}
      <div>
        {state.data.map(gist => (
          <GistRow key={gist.id} gist={gist} />
        ))}
      </div>
    </main>
  );
}

export default GistList;