/* global window */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
// import NProgress from 'nprogress';

// import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
// import layout  from 'components';
// import Header from 'components'
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import styles from '../components/layout/Layout.less';
// import { classnames, config } from 'utils';

// import '../themes/index.less';
// import classnames from 'classnames';
// import './app.less';
// import Error from './error';

import { initMenuData } from '../consts/MenuData.js';

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, sideBarFold,bigScreen } = app;

  console.log(`children=${children}`);
  console.log(`sideBarFold=${sideBarFold}`);

  console.log(`dispatch=${dispatch}`);
  console.log(`loading=${loading}`);
  console.log(location);


// const App = () => {
    // noinspection JSAnnotator
  const headerProps = {
    user,
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
  };

  const sidebarProps = {
    menu: initMenuData,
    currentPath: location.pathname,
    isFold: sideBarFold,
    user,
    bigScreen:bigScreen
  };

  return (
    <div>
      <Helmet>
        <title>quant-trade</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className={styles.layout}>
        <Header {...headerProps} />
        <aside className={styles.sidebar}>
          <Sidebar {...sidebarProps} />
        </aside>
      </div>
    </div>

  );
};
App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);

