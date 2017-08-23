/* global window */
import React from 'react';
// import NProgress from 'nprogress';
// import PropTypes from 'prop-types';
// import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
// import layout  from 'components';
// import Header from 'components'
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import styles from '../components/layout/Layout.less';
// import { classnames, config } from 'utils';
import { Helmet } from 'react-helmet';
// import '../themes/index.less';
import classnames from 'classnames';
// import './app.less';
// import Error from './error';

import { initMenuData } from '../consts/MenuData.js';

const App = ({ children, dispatch, app, loading, location }) => {
    // noinspection JSAnnotator
  const headerProps = {

    user: {
      name: '刘老爷',
      iconUrl: '/img/lyy.jpg',
    },
  };

  const sidebarProps = {
    menu: initMenuData,
    profile: {
      name: '刘老爷',
      iconUrl: '/img/lyy.jpg',
      address: '重庆市 南岸区',
    },
  };

  return (
    <div>
      <Helmet>
        <title>quant-trade</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />


      </Helmet>
      <div className={styles.layout}>
        <Header {...headerProps} />
        <aside className={styles.sider}>
          <Sidebar {...sidebarProps} />
        </aside>


      </div>
    </div>

  );
};

App.propTypes = {};


export default connect(({}) => ({}))(App);
