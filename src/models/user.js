import modelExtend from 'dva-model-extend';

// import * as usersService from '../services/user';
import { create, query, remove } from '../services/user';

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

    * delete({ payload }, { call, put, select }) {
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
      // 我也在看白夜追凶，有点好看我也在看白夜追凶，有点好看

    updateList(state, { payload }) {
      console.log(payload);
      console.log(state);
        // if( !op ){
        //     return initData;
        // }

        // console.log('是否删除？ ' + isDelete);
        // if (!changeData) {
        //     return;
        // }
      const { newData } = payload;
      const result = [];
      let isExist = false;
      for (const user of state.list) {
        if (user._id === newData._id) { // 更新或者删除
          if (!payload.isDelete) { // 更新
            result.push({ ...user, ...newData });
          }
          isExist = true;// 找到了此数据，意味着不是修改，就是删除
        } else {
          result.push(user);
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
