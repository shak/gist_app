import React from 'react';
import { has, get, isEmpty } from 'lodash';

const GistRow = (props) => {
  let avatar = null;
  let description = `gist:${props.gist.id}`;

  if (has(props, 'gist.owner.avatar_url')) {
    avatar = <img
      className="avatar"
      src={get(props, 'gist.owner.avatar_url')}
      width="30"
      height="30"
      alt={get(props, 'gist.owner.login', 'User avatar')}
    />
  }
  if (has(props, 'gist.description') && isEmpty(props.gist.description) === false) {
    description = props.gist.description;
  }

  return (
    <div className="gist_row">
      <header>{avatar}<h4>{description}</h4></header>
    </div>
  );
}

export default GistRow;