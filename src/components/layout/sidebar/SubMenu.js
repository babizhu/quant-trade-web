/**
 * Created by liu_k on 2016/4/5.
 * 显示最底层的子菜单
 */
import React, { Component } from 'react';
// import { Icon } from 'antd';
import classnames from 'classnames';
import { Link } from 'react-router';
import styles from '../Sidebar.less';

class SubMenu extends Component {


  static click(e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    } else {
            // 否则，我们需要使用IE的方式来取消事件冒泡
      window.event.cancelBubble = true;
    }
  }

    /**
     * 生成菜单的一个子项
     * @param subMenuItem 菜单数据
     * @param index
     */
  buildSubMenuItem(subMenuItem, index) {
    const { currentPath, switchSider, bigScreen } = this.props;

    // let liClassName = '';
    let isSelected = false;
    if (currentPath.substring(1) === subMenuItem.component) {
      // liClassName += ' subItemActive';
      isSelected = true;
    }
    return (
      <li key={index} className={classnames({ [styles.subItemActive]: isSelected })} onClick={SubMenu.click.bind(this)}>
        <Link to={subMenuItem.component ? `/${subMenuItem.component}` : '/'} key={index} onClick={() => { !bigScreen && switchSider(); }}>
          <div>
            {subMenuItem.text}
          </div>

        </Link>
      </li>
    );
  }

  render() {
    const { subMenuData, subMenuClassName, visible } = this.props;

    const subMenu = subMenuData.map((item, index) => {
      if (true) {
        return this.buildSubMenuItem(item, index);
      }
      return '';
    });
    return (

      <ul className={subMenuClassName} style={{ display: visible ? '' : 'none' }}>
        {subMenu}
      </ul>

    );
  }
}

SubMenu.propTypes = {};
SubMenu.defaultProps = {};

export default SubMenu;
