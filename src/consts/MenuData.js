export const initMenuData = [{
  text: '主菜单',
  icon: 'ellipsis',
  menu: [
    {
      icon: 'home',
      text: '企业管理',
      index: 1,
      component: 'home',
      subMenu: [
        {
          icon: 'phone',
          text: '企业列表',
          component: '',
        },
        {
          icon: 'phone',
          text: '收益列表',
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
  ],
}, {
  text: '杂项设置',
  icon: 'ellipsis',
  menu: [
    {
      icon: 'shrink',
      text: '测试模块',
      index: 5,

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
