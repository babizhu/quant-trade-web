import modelExtend from 'dva-model-extend';

// import * as usersService from '../services/user';
import { create, query, remove } from '../services/strategy';

import { pageModel } from './common';

// const { query } = usersService;

// noinspection JSUnusedGlobalSymbols
export default modelExtend(pageModel, {
  namespace: 'tradingstrategy',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/tradingstrategy') {
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
              // pageSize: Number(payload.pageSize) || 100,
              pageSize: 100,
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
        if (payload._id === '-1') {
          payload._id = data._id;
        }
        yield put({ type: 'hideModal' });
        yield put({ type: 'updateList', payload: { isDelete: false, newData: { ...payload } } });
        // yield put({ type: 'query' });
      } else {
        throw data;
      }
    },

    * delete({ payload }, { call, put }) {
      const data = yield call(remove, payload);
      // const { selectedRowKeys } = yield select(_ => _.user);
      if (data.success) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'updateList', payload: { isDelete: true, newData: { ...payload } } });
          // yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } });
        // yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
  },
  reducers: {

    updateList(state, { payload }) {
      const { newData } = payload;
      const result = [];
      let isExist = false;
      for (const stategy of state.list) {
        if (stategy._id === newData._id) { // 更新或者删除
          if (!payload.isDelete) { // 更新
            result.push({ ...stategy, ...newData });
          }
          isExist = true;// 找到了此数据，意味着不是修改，就是删除
        } else {
          result.push(stategy);
        }
      }
      if (!isExist) { // 新增
        result.unshift(newData);
      }
      console.log(result);
      return {
        ...state,
        list: result,
      };
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
});
