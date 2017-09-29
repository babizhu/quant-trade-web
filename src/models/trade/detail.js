import pathToRegexp from 'path-to-regexp';
import { detail, start } from '../../services/trade';

export default {

  namespace: 'tradeDetail',
  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/trade/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'detail', payload: { id: match[1] } });
        }
      });
    },
  },

  effects: {
    * start({ payload }, { call }) {
      console.log(44444444444)
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
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload;
      return {
        ...state,
        data,
      };
    },
  },
};
