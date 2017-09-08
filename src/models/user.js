import modelExtend from 'dva-model-extend';

// import * as usersService from '../services/user';
import { create, query, remove, update } from '../services/user';

import { pageModel } from './common';

// const { query } = usersService;

// noinspection JSUnusedGlobalSymbols
export default modelExtend(pageModel, {
  namespace: 'user',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
  effects: {
    * query({ payload = {} }, { call, put }) {
      const data = yield call(query, payload);
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: 100,
              // total: data.total,
            },
          },
        });
      } else {
        throw data;
      }
    },

    * save({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.success) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
  },
  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
});
