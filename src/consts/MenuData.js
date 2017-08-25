let index = 1;
export const initMenuData = [{
  text: '主菜单',
  icon: 'ellipsis',
  menu: [
    {
      icon: 'pay-circle-o',
      text: '策略列表',
      index: index++,
      component: 'home',

    }, {
      icon: 'area-chart',
      text: '交易列表',
      index: index++,
    },
    {
      icon: 'home',
      text: '家庭设置',
      index: index++,

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
      index: index++,
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
      index: index++,
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
      index: index++,
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
      icon: 'pay-circle-o',
      text: '我要赞助',
      index: index++,
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
