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

/**
 * Returns forks owner info requred by this component. Discards the rest.
 *
 * @method extractForkOwners
 * @param {Array} forks
 * @return {Array}
 */
const extractForkOwners = forks =>
  (isArray(forks)) && forks.map((fork) => pick(fork, ['id', 'owner.avatar_url', 'owner.login']));

const Forks = props => {
  const [state, dispatch] = useReducer(GithubAPIStatefulReducer, {
    isLoading: false,
    isError: false,
    data: [],
    message: null
  });

  useEffect(async () => {
    try {
      dispatch({ type: FETCH_INIT });
      const response = await loadForksFromResourceURL(props.resourceURL, FORK_OWNERS_LIMIT);

      if (isArray(response)) {
        dispatch({ type: FETCH_SUCCESS, payload: extractForkOwners(response) });
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  }, [props.resourceURL]);

  return (
    <section className="forks">
      <span>{isEmpty(state.data) ? 'This gist has not been forked' : `Last forked by (max ${FORK_OWNERS_LIMIT}):`}</span>
      {state.data.map(fork => <Avatar key={fork.id} url={fork.owner.avatar_url} login={fork.owner.login} width="20" height="20" />)}
    </section>
  );
}

export default Forks;