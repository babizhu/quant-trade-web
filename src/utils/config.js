const APIV1 = '/api';
const APIV2 = '/api/v2';
// const HOST = 'http://192.168.1.156:8080';
const HOST = 'http://192.168.31.133:8080';
// const HOST = 'http://192.168.1.104:8080';
// const HOST = '/';
export default {
  host: HOST,
  name: 'Quant Trade',
  prefix: 'quantTrade',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  // openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/login`,
    userLogout: `${APIV1}/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    userQuery: `${APIV1}/user/query`,
    userSave: `${APIV1}/user/save`,
    userDelete: `${APIV1}/user/del`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    strategyQuery: `${APIV1}/tradingstrategy/query`,
    strategySave: `${APIV1}/tradingstrategy/save`,
    strategyDelete: `${APIV1}/tradingstrategy/del`,

    tradeQuery: `${APIV1}/trade/query`,
    tradeDetail: `${APIV1}/trade/detail`,
    tradeStart: `${APIV1}/trade/start`,
    tradeGetLogs: `${APIV1}/trade/getTradeInfo`,
    tradeSave: `${APIV1}/trade/save`,
    tradeDelete: `${APIV1}/trade/del`,
  },
};
