let index = 1;
export const initMenuData = [{
  text: '主菜单',
  icon: 'ellipsis',
  menu: [
    {
      icon: 'bulb',
      text: '投资信息',
      index: index++,
      subMenu: [
        {
          icon: 'area-chart',
          text: '我的策略',
          index: index++,
          component: 'strategy',
          path: '/strategy',
        },
        {
          icon: 'pay-circle-o',
          text: '我的交易',
          index: index++,
          component: 'trade',
          path: '/trade',
          subMenu: [
            {
              path: '/trade/:id',
              text: '交易详情',
            }],
        },
      ],
    }],
}, {
  text: '系统管理',
  icon: 'ellipsis',
  menu: [
    {
      icon: 'user',
      text: '用户管理',
      index: index++,
      subMenu: [
        {
          path: '/user',
          icon: 'user',
          text: '用户列表',
          component: 'user',
          subMenu: [
            {
              path: '/user/:id',
              text: '详情',
            }],
        },
        {
          icon: 'ellipsis',
          text: '所有策略',
          path: '/strategy',

          component: 'a',
        },
      ],
    },
    {
      icon: 'right-circle-o',
      text: '交易策略',
      index: index++,
      subMenu: [
        {
          icon: 'pay-circle-o',
          text: '策略列表',
          path: '/tradingstrategy',
          component: 'tradingstrategy',
        },
      ],
    },
  ],
},
];
