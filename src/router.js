// import React from 'react';
// import PropTypes from 'prop-types';
// import { Router } from 'dva/router';
// import App from './routes/app';
// import { getCookie } from './utils/cookie';
//
// const registerModel = (app, model) => {
//   if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
//     app.model(model);
//   }
// };
// const validateLogin = (next, replace, callback) => {
//   // console.log(getCookie('token'));
//   const token = getCookie('token');
//   const isLoggedIn = token !== null;
//   if (!isLoggedIn && next.location.pathname !== '/login') {
//     const from = next.location.pathname;
//     replace(`/login?from=${from}`);
//   }
//   callback();
// };
//
// const Routers = function ({ history, app }) {
//   const routes = [
//     {
//       path: 'login',
//       getComponent(nextState, cb) {
//                 // noinspection JSUnresolvedFunction
//         require.ensure([], (require) => {
//           registerModel(app, require('./models/login'));
//           cb(null, require('./routes/login/'));
//         }, 'login');
//       },
//     },
//     {
//
//       path: '/',
//       component: App,
//       onEnter: validateLogin,
//       getIndexRoute(nextState, cb) {
//         require.ensure([], (require) => {
//           registerModel(app, require('./models/dashboard'));
//           cb(null, { component: require('./routes/dashboard/') });
//         }, 'dashboard');
//       },
//       childRoutes: [
//
//         {
//           path: 'dashboard',
//           getComponent(nextState, cb) {
//             require.ensure([], (require) => {
//               registerModel(app, require('./models/dashboard'));
//               cb(null, require('./routes/dashboard/'));
//             }, 'dashboard');
//           },
//         },
//         {
//           path: 'user',
//           getComponent(nextState, cb) {
//             require.ensure([], (require) => {
//               registerModel(app, require('./models/user'));
//               cb(null, require('./routes/user/'));
//             }, 'user');
//           },
//         }, {
//           path: 'tradingstrategy',
//           getComponent(nextState, cb) {
//             require.ensure([], (require) => {
//               registerModel(app, require('./models/tradingstrategy'));
//               cb(null, require('./routes/tradingstrategy/'));
//             }, 'tradingstrategy');
//           },
//         }, {
//           path: 'stage',
//           getComponent(nextState, cb) {
//             require.ensure([], (require) => {
//               registerModel(app, require('./models/stage'));
//               cb(null, require('./routes/stage/'));
//             }, 'stage');
//           },
//         },
//         {
//           path: '*',
//           getComponent(nextState, cb) {
//             require.ensure([], (require) => {
//               cb(null, require('./routes/notfound/'));
//             }, 'error');
//           },
//         },
//       ],
//     },
//   ];
//
//   return <Router history={history} routes={routes} />;
// };
//
// Routers.propTypes = {
//   history: PropTypes.object,
//   app: PropTypes.object,
// };
//
// export default Routers;
// import React from 'react';
// import { Router, Switch, Route } from 'dva/router';
// import dynamic from 'dva/dynamic';
//
// function RouterConfig({ history, app }) {
//     // const IndexPage = dynamic({
//     //     app,
//     //     component: import('./routes/IndexPage'),
//     // });
//
//   const User = dynamic({
//     app,
//     models: [
//       import('./models/user'),
//     ],
//     component: import('./routes/user/'),
//   });
//
//   return (
//     <Router history={history}>
//       <Switch>
//         <Route exact path="/" component={User} />
//       </Switch>
//     </Router>
//   );
// }
//
// export default RouterConfig;


// import React from 'react';
import React from 'react';

import PropTypes from 'prop-types';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';
// import login from './routes/login';
import { validateLogin } from './utils';


const { ConnectedRouter } = routerRedux;

const Routers = ({ history, app }) => {
  const error = dynamic({
    app,
    component: () => import('./routes/notfound'),
  });
  // const Login = dynamic({
  //   path: '/login',
  //   models: () => [import('./models/login')],
  //   component: () => import('./routes/login/'),
  // });
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/user',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/tradingstrategy',
      models: () => [import('./models/tradingstrategy')],
      component: () => import('./routes/tradingstrategy/'),
    },
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/trade',
      models: () => [import('./models/trade')],
      component: () => import('./routes/trade/'),
    },
  ];

    // const preCondition=(condition, WrappedComponent)=> {
    //     return class extends Component {
    //         componentWillMount{
    //         validateLogin();
    //     }
    //
    //     render() {
    //     <WrappedComponent {...this.props} />
    //     }
    // }
    // };
  return (
    <ConnectedRouter history={history}>

      <App>

        <Switch>

          <Route
            exact path="/" render={() => {
              return validateLogin() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />;
            }}
          />
          {
                    routes.map(({ path, ...dynamics }, key) => (
                      <Route
                        key={key}

                        path={path}
                        component={dynamic({
                          app,
                          ...dynamics,
                        })}
                      />
                    ))
                }
          <Route component={error} />
        </Switch>

      </App>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;

