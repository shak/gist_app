import React, { useEffect, useState, useReducer} from 'react';
import { isArray } from 'lodash';

import { loadGistsByUser } from '../models/github.js';
import GistRow from './GistRow.js';

const FETCH_SUCCESS = 0;
const FETCH_ERROR = 1;
const FETCH_INIT = 2;

/**
 * State/action reduces for the gist pull. See React's hooks API for more info
 * 
 * @method gistListReducer
 * @param {Object} state 
 * @param {Object} action
 * @return {Object} 
 */
const gistListReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: null
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        message: null
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        message: action.payload
      };
    default:
      throw new Error();
  }
};

/**
 * GistList react functional component
 */
const GistList = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('rdeavila');

  const [state, dispatch] = useReducer(gistListReducer, {
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