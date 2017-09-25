/* global window */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter, routerRedux } from 'dva/router';
// import NProgress from 'nprogress';
// import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Breadcrumb from '../components/layout/Breadcrumb';

import styles from '../components/layout/Layout.less';
import { initMenuData } from '../consts/MenuData.js';
import { validateLogin } from '../utils';


// import './app.less';
// import Error from './error';
class App extends Component {
  componentWillMount() {
    // console.log(dispatch);
    // console.log('Author.componentWillMount');
    if (!validateLogin()) {
      const { dispatch, location } = this.props;
      const { pathname } = location;
      console.log('开始跳转到longin页面了');
      dispatch((routerRedux.push(`/login?from=${pathname}`)));
    }
  }
// const App = ({ children, dispatch, app, loading, location }) => {
  render() {
    const { children, dispatch, app, loading, location } = this.props;
    const { user, sideBarFold, bigScreen } = app;
    const { pathname } = location;

        //
        // const swichSider = () => {
        //   dispatch({ type: 'app/switchSider' });
        // };
    const headerProps = {
      user,
      switchSider() {
        dispatch({ type: 'app/switchSider' });
      },
      logout() {
        dispatch({ type: 'app/logout' });
      },
    };

    const sidebarProps = {
      switchSider() {
        dispatch({ type: 'app/switchSider' });
      },
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
    let height;

    if (!bigScreen) {
      contentMarginLeft = '0px';
      if (sideBarFold) { // 小屏幕下的mini模式，隐藏sideBar
        displayMode = 'none';
      } else {
        displayMode = 'block';
        height = 'auto';
      }
    }
    let sidebarPosition = '';
    if (!bigScreen) {
      sidebarPosition = 'relative';
    }

        // if (!validateLogin()) {
        //   console.log('pushle');
        //   const p = '/login';
        //   dispatch(routerRedux.push({
        //     p,
        //     query: {},
        //   }));
        // }
    return (
            pathname === '/login' ? <div>{children}</div> :
            <div>
              <Helmet>
                <title>quant-trade</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </Helmet>
              <div className={styles.layout}>
                <Header {...headerProps} />
                <aside className={styles.sidebar} style={{ position: sidebarPosition, display: displayMode, height }}>
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
  }
}
App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};
export default withRouter(connect(({ app, loading }) => ({ app, loading}))(App));

// export default connect(({ app, loading }) => ({ app, loading }))(App);

