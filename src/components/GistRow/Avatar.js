import React from 'react';
import { get } from 'lodash';

const Avatar = (props) => 
  <img
    className="avatar"
    src={get(props, 'url')}
    width="30"
    height="30"
    alt={get(props, 'login', 'User avatar')}
  />

export default Avatar;