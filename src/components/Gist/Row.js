import React from 'react';
import { has, get, isEmpty } from 'lodash';
import Forks from './Row/Forks.js';
import Langs from './Row/Langs.js';
import Avatar from './Row/Avatar.js';

const GistRow = (props) => {
  let avatar = null;
  let description = `gist:${props.gist.id}`;

  if (has(props, 'gist.description') && isEmpty(props.gist.description) === false) {
    description = props.gist.description;
  }

  return (
    <div className="gist_row">
      <header>
        <Avatar url={props.gist.owner.avatar_url} login={props.gist.owner.login} />
        <h4>{description}</h4>
      </header>
      <Forks resourceURL={props.gist.forks_url} />
      <Langs id={props.gist.id} files={props.gist.files} />
    </div>
  );
}

export default GistRow;