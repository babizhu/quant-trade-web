/**
 * Created by liu_k on 2016/4/5.
 * 最外层的菜单组
 * NORMAL:显示文字
 * MINI:显示一个'...'的图标
 *
 */

import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import Menu from './Menu';
import styles from '../Sidebar.less';

class MenuGroup extends Component {

  render() {
    const { menuGroup, isFold, currentPath, bigScreen, switchSider } = this.props;
    return (
      <span>
        <li className={styles.navigationHeader}>
          {!isFold && <span >{menuGroup.text}</span>}
          {isFold && <Icon type={menuGroup.icon} className={styles.navigationHeaderIcon} />}
        </li>
        <Menu
          switchSider={switchSider}
          menuData={menuGroup.menu} isFold={isFold}
          currentPath={currentPath}
          bigScreen={bigScreen}
        />
      </span>
    );
  }
}

MenuGroup.propTypes = {
  menuGroup: PropTypes.object.isRequired, // 菜单数据
  isFold: PropTypes.bool.isRequired, // 侧边栏是否收起
  bigScreen: PropTypes.bool.isRequired, // 是否大屏
  currentPath: PropTypes.string.isRequired,
  switchSider: PropTypes.func.isRequired,

};
// MenuGroup.defaultProps = {};

export default MenuGroup;
