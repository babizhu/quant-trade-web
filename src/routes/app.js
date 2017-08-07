/* global window */
import React from 'react';
// import NProgress from 'nprogress';
// import PropTypes from 'prop-types';
// import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
// import layout  from 'components';
// import Header from 'components'
import Header from '../components/layout/Header'
// import { classnames, config } from 'utils';
import { Helmet } from 'react-helmet';
// import '../themes/index.less';
import classnames from 'classnames';
// import './app.less';
// import Error from './error';

// const { Header } = layout;
const App = ({ children, dispatch, app, loading, location }) => {
  return (
    <div>
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />


      </Helmet>
      <div>
        <Header />

      </div>
    </div>

  );
};

App.propTypes = {};


export default connect(({}) => ({}))(App);
