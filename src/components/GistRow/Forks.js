import React, { useEffect, useReducer } from 'react';
import { isArray, pick } from 'lodash';
import { loadForksFromResourceURL }  from '../../models/github.js';
import Avatar from './Avatar.js';

const FETCH_SUCCESS = 0;
const FETCH_ERROR = 1;
const FETCH_INIT = 2;

const FORK_OWNERS_LIMIT = 3;

const extractForkOwners = (forks) => 
  (isArray(forks)) && forks.map((fork) => pick(fork, ['id', 'owner.avatar_url', 'owner.login']));

const gistForkReducer = (state, action) => {
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
        data: extractForkOwners(action.payload),
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

const Forks = (props) => {
  const [state, dispatch] = useReducer(gistForkReducer, {
    isLoading: false,
    isError: false,
    data: [],
    message: null
  });

  useEffect(async () => {
    try {
      dispatch({ type: FETCH_INIT });
      // attempt fetch from the API
      const response = await loadForksFromResourceURL(props.resourceURL, FORK_OWNERS_LIMIT);
      
      if (isArray(response)) {
        dispatch({ type: FETCH_SUCCESS, payload: response });
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  }, [props.resourceURL]); // bind on first load

  return (
    <section className="gist_forks">
      Forks: {state.data.map(fork => <Avatar key={fork.id} url={fork.owner.avatar_url} login={fork.owner.login} />)}
    </section>
  );
}

export default Forks;