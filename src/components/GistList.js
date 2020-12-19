import React, { useEffect, useState, useReducer} from 'react';
import { loadGistsByUser } from '../models/github.js';

const FETCH_SUCCESS = 0;
const FETCH_ERROR = 1;

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
  const [search, setSearch] = useState('');

  const [state, dispatch] = useReducer(gistListReducer, {
    isLoading: false,
    isError: false,
    data: [],
    message: null
  });

  useEffect(async () => {
    try {
      if (typeof search === 'string' && search.length > 0) {
        const response = await loadGistsByUser(search);

        if (Array.isArray(response)) {
          dispatch({ type: FETCH_SUCCESS, payload: response });
        }
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  }, [search]); // bind to updates on search term

  return (
    <aside className="column">
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
      <ul>
        {state.data.map(gist => (
          <li key={gist.id}>
            {gist.description}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default GistList;