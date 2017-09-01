import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.less';


function Dashboard({ dashboard }) {
  // console.log(`dashboard${dashboard}`);
  return (
    <div>
      <Button type="primary"  onClick={()=>console.log("我被电击了！！！！！")}>
        Click me!
      </Button>
      <h1>count:{dashboard.count}</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
};

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard);
