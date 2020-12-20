import React, {
  useEffect,
  useReducer } from 'react';

import {
  isArray,
  pick,
  isEmpty } from 'lodash';

import GithubAPIStatefulReducer, {
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_INIT } from '../../../reducers/hooks/GithubAPIStatefulReducer';

import { loadForksFromResourceURL }  from '../../../models/github.js';
import Avatar from './Avatar.js';

const FORK_OWNERS_LIMIT = 3;

const extractForkOwners = (forks) =>
  (isArray(forks)) && forks.map((fork) => pick(fork, ['id', 'owner.avatar_url', 'owner.login']));

const Forks = (props) => {
  const [state, dispatch] = useReducer(GithubAPIStatefulReducer, {
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
        dispatch({ type: FETCH_SUCCESS, payload: extractForkOwners(response) });
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  }, [props.resourceURL]); // bind on first load

  return (
    <section className="forks">
      <span>{isEmpty(state.data) ? 'This gist has not been forked' : `Last ${FORK_OWNERS_LIMIT} forks:`}</span>
      {state.data.map(fork => <Avatar key={fork.id} url={fork.owner.avatar_url} login={fork.owner.login} />)}
    </section>
  );
}

export default Forks;