/* global window */
/* global document */
/* global location */

// import { parse } from 'qs';
// import config from 'config';
// import { EnumRoleType } from 'enums';
import { routerRedux } from 'dva/router';
import { logout } from '../services/app';
// import * as menusService from '../services/menus';

// const { prefix } = config;
// import { routerRedux } from 'dva/router'
import { prefix } from '../consts/Config';
import { delCookie } from '../utils/cookie';


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
    bigScreen: document.body.clientWidth > 770,
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
    }, { put, call }) {
      const data = yield call(logout, payload);
      if (data.success) {
        delCookie('token', '/');
        yield put(routerRedux.push('/login'));
      } else {
        throw (data);
      }
    },

  },
  reducers: {
    handleNavbar(state, { payload }) {
      return {
        ...state,
        bigScreen: payload,
      };
    },
    switchSiderOnContent(state){//如果是小屏幕并且sidebar显示的情况下 点击空白处，让siebar收起，可能会有别个bug，再看看吧
      // console.log('state.sideBarFold'+state.sideBarFold);
      if(!state.sideBarFold && !state.bigScreen) {
        return {
          ...state,
          sideBarFold: !state.sideBarFold,
        };
      }
      return state;
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
