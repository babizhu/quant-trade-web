import pathToRegexp from 'path-to-regexp';
import { detail, start, getLogs } from '../../services/trade';

export default {

  namespace: 'tradeDetail',
  state: {
    data: {},
    logs: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/trade/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'detail', payload: { id: match[1] } });
          dispatch({ type: 'getlogs', payload: { _id: match[1] } });
        }
      });
    },
  },

  effects: {
    * start({ payload }, { call }) {
      const data = yield call(start, payload);
      const { success } = data;
      if (success) {
        console.log('提交成功');
      } else {
        throw data;
      }
    },

    * detail({
      payload,
    }, { call, put }) {
      const data = yield call(detail, payload);
      const { success, list } = data;
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: list[0],
          },
        });
      } else {
        throw data;
      }
    },
    * getlogs({
                   payload,
               }, { call, put }) {
      const data = yield call(getLogs, payload);
      const { success, res } = data;
      if (success) {
        yield put({
          type: 'querySuccess1',
          payload: {
            logs: res,
          },
        });
      } else {
        throw data;
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload;
      return {
        ...state,
        data,

      };
    },
    querySuccess1(state, { payload }) {
      const { logs } = payload;
      console.log(logs);
      return {
        ...state,
        logs,
      };
    },
  },


};
