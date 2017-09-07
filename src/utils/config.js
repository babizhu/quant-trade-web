const APIV1 = '/api';
const APIV2 = '/api/v2';
const HOST = 'http://192.168.31.133:8080';
export default {
  host: HOST,
  name: 'Quant Trade',
  prefix: 'quantTrade',
  // footerText: 'Ant Design Admin  © 2017 zuiidea',
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
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
};
