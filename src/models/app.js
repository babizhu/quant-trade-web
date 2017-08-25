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
import { prefix } from '../consts/Config';

export default {
  namespace: 'app',
  state: {
    user: {
      name: '刘老爷',
      iconUrl: '/img/lyy.jpg',
      address: '重庆市 南岸区',
    },
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
    sideBarFold: window.localStorage.getItem(`${prefix}sideBarFold`) === 'true', // 导航栏是否收起
        // darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    bigScreen: document.body.clientWidth > 768,
        // navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup({ dispatch }) {
      // dispatch({ type: 'query' });
      // let tid;
      window.onresize = () => {
        dispatch({ type: 'changeSidebar' });
        // clearTimeout(tid);
        // tid = setTimeout(() => {
        //   dispatch({ type: 'changeSidebar' });
        // }, 300);
      };
    },

  },
  effects: {
    * changeSidebar(action, { put, select }) {
      const { app } = yield (select(_ => _));
      const bigScreen = document.body.clientWidth > 768;
      if (bigScreen !== app.bigScreen) {
        yield put({ type: 'handleNavbar', payload: bigScreen });
      }
    },

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
    handleNavbar(state, { payload }) {
      return {
        ...state,
        bigScreen: payload,
      };
    },
    switchSider(state) {
      window.localStorage.setItem(`${prefix}sideBarFold`, !state.sideBarFold);
      return {
        ...state,
        sideBarFold: !state.sideBarFold,
      };
    },
  },
};
