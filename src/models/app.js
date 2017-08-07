/* global window */
/* global document */
/* global location */

// import { parse } from 'qs';
// import config from 'config';
// import { EnumRoleType } from 'enums';
// import { query, logout } from '../services/app';
// import * as menusService from '../services/menus';

// const { prefix } = config;
// import { routerRedux } from 'dva/router'
export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    // menuPopoverVisible: false,
    // siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    // darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    // isNavbar: document.body.clientWidth < 769,
    // navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup({ dispatch }) {
      dispatch({ type: 'changeNavbar' });
    },

  },
  effects: {

    * logout({
      payload,
    }, { call, put }) {
      // const data = yield call(logout, parse(payload));
      // if (data.success) {
      //   yield put({ type: 'query' });
      // } else {
      //   throw (data);
      // }
    },

  },
  reducers: {
  },
};
