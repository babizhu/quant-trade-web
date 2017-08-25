export const initMenuData = [{
  text: '主菜单',
  icon: 'ellipsis',
  menu: [
    {
      icon: 'home',
      text: '我的策略',
      index: 1,
      component: 'home1',
      subMenu: [
        {
          icon: 'stock',
          text: '策略列表',
          component: '',
        },
        {
          icon: 'phone',
          text: '交易列表',
          component: '',
        },
      ],
    }, {
      icon: 'user',
      text: '用户管理',
      index: 2,
      subMenu: [
        {
          icon: 'phone',
          text: '用户列表',
          component: 'user',
        },
        {
          icon: 'ellipsis',
          text: '策略列表',
          component: 'user',
        },
      ],
    },
    {
      icon: 'home',
      text: '家庭设置',
      index: 3,

      subMenu: [
        {
          icon: 'stock',
          text: '策略列表',
          component: 's',
        },
        {
          icon: 'phone',
          text: '交易列表',
          component: 's',
        },
      ],
    }, {
      icon: 'user',
      text: '路由设置',
      index: 4,
      subMenu: [
        {
          icon: 'phone',
          text: '用户列表',
          component: 'a',
        },
        {
          icon: 'ellipsis',
          text: '策略列表',
          component: 'a',
        },
      ],
    },
    {
      icon: 'home',
      text: '我的配置',
      index: 5,
      subMenu: [
        {
          icon: 'stock',
          text: '策略列表',
          component: 'b',
        },
        {
          icon: 'phone',
          text: '交易列表',
          component: 'b',
        },
      ],
    }, {
      icon: 'user',
      text: '收益状况',
      index: 6,
      subMenu: [
        {
          icon: 'phone',
          text: '用户列表',
          component: 'd',
        },
        {
          icon: 'ellipsis',
          text: '策略列表',
          component: 's',
        },
      ],
    },
  ],
}, {
  text: '杂项设置',
  icon: 'ellipsis',
  menu: [
    {
      icon: 'shrink',
      text: '测试模块',
      index: 7,
      subMenu: [
        {
          icon: 'phone',
          text: '测试程序',
          component: '/',
        },
      ],
    },
  ],
},
];
