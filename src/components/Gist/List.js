import React, {
  useEffect,
  useState,
  useReducer } from 'react';

import {
  isArray,
  add,
  subtract } from 'lodash';

import GithubAPIStatefulReducer, {
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_INIT } from '../../reducers/hooks/GithubAPIStatefulReducer';

import { loadGistsByUser } from '../../models/github.js';
import GistRow from './Row.js';

const GistList = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [gistPage, setGistPage] = useState(1);

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
        const response = await loadGistsByUser(search, gistPage);

        if (isArray(response)) {
          dispatch({ type: FETCH_SUCCESS, payload: response });
        }
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  }, [search, gistPage]); // bind to updates on search term and pagination


  return (
    <section>
      <form
        onSubmit={event => {
          setSearch(query);
          setGistPage(1); // in case user changes the search term on a page greater than 1
          event.preventDefault(); // prevent GET request from triggering on submit
        }}
      >
        <input
          className="search"
          type="text"
          value={query}
          placeholder="Github username"
          onChange={event => setQuery(event.target.value)}
        />
        <button className="search_submit" type="submit">Show Gists</button>
      </form>
      {/* The following can be moved to a reusable component very easily */}
      <nav className="paginator">
        <button
          disabled={(gistPage <= 1)}
          onClick={() => setGistPage(subtract(gistPage, 1))}>
            Previous Page
        </button>
        <button
          disabled={(state.data.length === 0)}
          onClick={() => setGistPage(add(gistPage, 1))}>
            Next Page
        </button>
      </nav>
      {/* The following can definitely be styled better and/or moved to reusable components */}
      {state.isError ? <p className="error">{state.message}</p> : ''}
      {state.isLoading ? <p className="loading">Loading</p> : ''}
      <main role="main">
        {state.data.length === 0 && state.isLoading === false && gistPage > 1 ? <p>There are no gists to show</p>: ''}
        {state.data.map(gist => (
          <GistRow key={gist.id} gist={gist} />
        ))}
      </main>
    </section>
  );
}

export default GistList;