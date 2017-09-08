import dva from 'dva';
import { notification } from 'antd';
import { hashHistory } from 'dva/router';
// import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { getErrMsg } from './consts/ErrorText';
import './index.css';

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
    notification.error({
      message: '出故障啦',
      description: <span> {errDescription.url}<div style={{ marginTop: '20px' }}>{errDescription.msg}</div></span>,
      duration: 600,
            // key,
            // btn: errMsg.errId == 101 ? btn : null,
    });
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