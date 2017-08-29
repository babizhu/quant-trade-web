/* global window */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
// import NProgress from 'nprogress';
// import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from '../components/layout/Layout.less';
import { initMenuData } from '../consts/MenuData.js';
// import './app.less';
// import Error from './error';

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, sideBarFold, bigScreen } = app;

    // console.log(routes);
    // console.log(`sideBarFold=${sideBarFold}`);

    // console.log(`dispatch=${dispatch}`);
  console.log(`loading=${loading}`);
    // console.log(location);


// const App = () => {
    // noinspection JSAnnotator
  const headerProps = {
    user,
    switchSider() {
      dispatch({ type: 'app/switchSider' });
    },
  };

  const sidebarProps = {
    menu: initMenuData,
    currentPath: location.pathname,
    isFold: sideBarFold,
    user,
    bigScreen,
  };

    // noinspection JSAnnotator
  const breadcrumbProps = {
    menu: initMenuData,
    currentPath: location.pathname,
    separator: '/',
  };

  let contentMarginLeft = '240px';
  if (bigScreen && sideBarFold) {
    contentMarginLeft = '59px';
  }
  let displayMode;

  if (!bigScreen) {
    contentMarginLeft = '0px';
    if (sideBarFold) { // 小屏幕下的mini模式，隐藏sideBar
      displayMode = 'none';
    } else {
      displayMode = 'block';
    }
  }
  let sidebarPosition = '';
  if (!bigScreen) {
    sidebarPosition = 'relative';
  }

  return (
    <div>
      <Helmet>
        <title>quant-trade</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className={styles.layout}>
        <Header {...headerProps} />
        <aside className={styles.sidebar} style={{ position: sidebarPosition, display: displayMode }}>
          <Sidebar {...sidebarProps} />
        </aside>
        <div className={styles.container} style={{ marginLeft: contentMarginLeft }}>


          <Breadcrumb {...breadcrumbProps} />

          <div className={styles.content}>
            {children}
          </div>
        </div>
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

