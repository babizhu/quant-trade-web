import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import App from './routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};
const validateLogin = (next, replace, callback) => {
  const from = next.location.pathname;
  const isLoggedIn = false;
  if (!isLoggedIn && next.location.pathname !== '/login'&&next.location.pathname==='/') {
    replace(`/login?from=${from}`);
  }
  callback();
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: 'login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login'));
          cb(null, require('./routes/login/'));
        }, 'login');
      },
    },
    {

      path: '/',
      component: App,
      onEnter: validateLogin,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'));
          cb(null, { component: require('./routes/dashboard/') });
        }, 'dashboard');
      },
      childRoutes: [

        {
          path: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'));
              cb(null, require('./routes/dashboard/'));
            }, 'dashboard');
          },
        }, {
          path: 'user',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/user/'));
            }, 'user');
          },
        }, { path: 'stage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/stage'));
              cb(null, require('./routes/stage/'));
            }, 'stage');
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
