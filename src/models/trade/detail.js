import pathToRegexp from 'path-to-regexp';
import { detail, start, getLogs } from '../../services/trade';
import {delay} from '../../utils';

export default {

  namespace: 'tradeDetail',
  state: {
    data: {},
    logs: '',
    beginGetLogs:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/trade/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'detail', payload: { id: match[1] } });
          // dispatch({type: 'getlogs', payload: {_id: match[1]}});

        }
      });
    },
  },

  effects: {
    * start({ payload }, { call,put }) {
      const data = yield call(start, payload);
      const { success } = data;
      if (success) {
        yield put({
          type: 'startSuccess',
        });
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
    * getlogs({ payload,}, { call, put,select }) {
      while (true) {
        const routing = yield select(state => state.routing);
        if(!routing.location.pathname.startsWith('/trade/')){
          yield put({
            type:'beginGetLogs',
            payload:{
              beginGetLogs:false,
            }
          });
          return;
        }
        const data = yield call(getLogs, payload);
        const { success, res } = data;
        if (success) {
          yield put({
            type:'beginGetLogs',
            payload:{
              beginGetLogs:true,
            }
          });
          yield put({
            type: 'getlogsSuccess',
            payload: {
              logs: res,
            },
          });
        } else {
          throw data;
        }
        yield call(delay, 30000);
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
    startSuccess(state, { payload }) {
      let newData={
          ...state.data,
          status:1,
      }
      console.log(state.data)
      return {
        ...state,
        data:newData,

      };
    },
    getlogsSuccess(state, { payload }) {
      const { logs } = payload;
      return {
        ...state,
        logs,
      };
    },
    beginGetLogs(state, { payload }) {
      const { beginGetLogs } = payload;
      return {
        ...state,
        beginGetLogs,
      };
    },
  },


};
