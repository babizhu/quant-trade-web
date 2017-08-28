import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import styles from './index.less';


function Stage({ stage }) {
  const { stages } = stage;
  console.log(stages);
  return (
    <div>
      <h1>名字：{stages[0].name}</h1>
      <h1>作者:{stages[0].author}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
      <h1>{stages[0].name}</h1>
    </div>
  );
}

Stage.propTypes = {
  stages: PropTypes.object,
};

export default connect(({ stage }) => ({ stage }))(Stage);
