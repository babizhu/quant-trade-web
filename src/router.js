import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import App from './routes/app';
import { getCookie } from './utils/cookie';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};
const validateLogin = (next, replace, callback) => {
  // console.log(getCookie('token'));
  const token = getCookie('token');
  const isLoggedIn = token !== null;
  if (!isLoggedIn && next.location.pathname !== '/login') {
    const from = next.location.pathname;
    replace(`/login?from=${from}`);
  }
  callback();
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: 'login',
      getComponent(nextState, cb) {
                // noinspection JSUnresolvedFunction
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
        },
        {
          path: 'user',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/user/'));
            }, 'user');
          },
        }, {
          path: 'tradingstrategy',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/tradingstrategy'));
              cb(null, require('./routes/tradingstrategy/'));
            }, 'tradingstrategy');
          },
        }, {
          path: 'stage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/stage'));
              cb(null, require('./routes/stage/'));
            }, 'stage');
          },
        },
        {
          path: '*',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/notfound/'));
            }, 'error');
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
