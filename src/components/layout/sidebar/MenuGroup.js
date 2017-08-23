/**
 * Created by liu_k on 2016/4/5.
 * 最外层的菜单组
 * NORMAL:显示文字
 * MINI:显示一个'...'的图标
 *
 */

import React, { Component } from 'react';
import { Icon } from 'antd';

import Menu from './Menu';
import styles from '../Sidebar.less';
import {NORMAL} from "../../../consts/Consts";

class MenuGroup extends Component {

  render() {
    const { menuGroup,showMode} = this.props;
    return (
      <span>
        <li className={styles.navigationHeader}>
          {showMode === NORMAL && <span >{menuGroup.text}</span>}
          {showMode !== NORMAL && <Icon type={menuGroup.icon} className={styles.navigationHeaderIcon} />}
        </li>
        <Menu menuData={menuGroup.menu} showMode={showMode} />
      </span>
    );
  }
}

// MenuGroup.propTypes = {
//   menuGroup: PropTypes.object.isRequired, // 菜单数据
//   componentUrl: PropTypes.string.isRequired, // url
//   changeMenuOpenStatus: PropTypes.func.isRequired, // 函数用于设置菜单是否展开子菜单
//   sideBar: PropTypes.object.isRequired, // 边栏相关的state
// };
// MenuGroup.defaultProps = {};

export default MenuGroup;
