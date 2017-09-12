import dva from 'dva';
import { notification } from 'antd';
import { hashHistory } from 'dva/router';
// import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { getErrMsg } from './consts/ErrorText';
import './index.css';
import * as React from 'react';

export function showError(errDescription) {
  notification.error({
    message: '出故障啦',
    description: <span> {errDescription.url}
      <div style={{ marginTop: '20px' }}>{errDescription.msg}</div>
      <div style={{ marginTop: '20px' }}>{new Date().toLocaleString('zh-CN', { hour12: false })}</div>
    </span>,
    duration: 600,
    // key,
    // btn: errMsg.errId == 101 ? btn : null,
  });
}
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  // history: browserHistory,
  history: hashHistory,
  onError(error) {
    const msg = error.message.split('|');
    const errDescription = getErrMsg(msg[0], msg[1], msg[2]);
    showError(errDescription);
    // message.error(error.message);
  },
});


// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
