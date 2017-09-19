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
          icon: 'pay-circle-o',
          text: '我的策略',
          index: index++,
          component: 'stage',
        },
        {
          icon: 'area-chart',
          text: '我的交易',
          index: index++,
          component: 'trade',
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
          icon: 'user',
          text: '用户列表',
          component: 'user',
        },
        {
          icon: 'ellipsis',
          text: '所有策略',
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
          component: 'tradingstrategy',
        },
      ],
    },
  ],
},
];
