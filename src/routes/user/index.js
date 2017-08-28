import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dva';
import styles from './index.less';

const User = ({ user }) => {

  const { users } = user;

  return (

    <div>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
      <h1>{users.name}</h1>
    </div>
  );
}

User.propTypes = {
};
export default connect(({ user }) => ({ user }))(User);

