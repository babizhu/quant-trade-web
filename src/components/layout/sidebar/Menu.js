/**
 * Created by liu_k on 2016/4/5.
 * 菜单有两种状态，选中状态和展开状态，处于选中状态的菜单一定处于展开状态，反之未必
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import {NORMAL,MINI} from "../../../consts/Consts";

import Animate from 'rc-animate';

import SubMenu from './SubMenu';

class Menu extends Component {
  constructor() {
    super();
    this.currentSelectIndex = -1;
    this.state = { showSubMenuIndex: -1 };
  }

  componentDidMount() {
    const { changeMenuOpenStatus } = this.props;
    if (this.currentSelectIndex !== -1) {
      changeMenuOpenStatus(this.currentSelectIndex);
    }
  }

  handlerMouseOver(menuItem) {
    const { showMode } = this.props;

    if (showMode === false) {
            // console.log(menuItem.text + '.' + menuItem.index);
      this.setState({ showSubMenuIndex: menuItem.index });
    }
  }

    // 鼠标移出
  handlerMouseOut() {
    const { showMode } = this.props.sideBar;
    if (showMode === false) {
      this.setState({ showSubMenuIndex: -1 });
    }
  }

  menuClick(menuItem) {
    const { changeMenuOpenStatus } = this.props;
    changeMenuOpenStatus(menuItem.index);
  }


  static buildArrowIcon(showSubMenu) {
    const arrowIcon = showSubMenu ? 'down' : 'right';
    return (
      <div className="arrow">
        <Icon type={arrowIcon} />
      </div>
    );
  }


    /**
     * 设置当前菜单是否为选中状态
     * 1、菜单本身的component和url相同，返回true
     * 2、菜单的任意子菜单的component和url相同，返回true
     * @param menuItem
     * @param componentUrl
     */
  static isSelected(menuItem, componentUrl) {
    // const url = componentUrl.substring(1);// 去除掉url最前面的/
    //     // console.log( 'url=' + url);
    //     // console.log(url.split('/')[0]+ ' ' + url.split('/')[1]);
    //     // console.log(menuItem.component);
    // if (url == menuItem.component || url.split('/')[0] == menuItem.component) {
    //   return true;
    // }
    // if (menuItem.subMenu) {
    //   for (const subMenu of menuItem.subMenu) {
    //     if (subMenu.component == url || url.split('/')[0] == subMenu.component) {
    //       return true;
    //     }
    //   }
    // }
    return false;
  }

    /**
     * 生成菜单的一个子项
     * @param menuItem 菜单数据
     * @param index
     */
  buildMenuItem(menuItem, index) {
    const { componentUrl, sideBar,showMode } = this.props;


    let arrow;// 菜单右边的箭头的显示内容
    let liClassName = 'navigation-item';// li标签的className
    let textClassName = '';// 菜单文本的className
    let subMenuClassName = '';// 子菜单的className
    let textShow = '';// 是否显示菜单文本（大屏幕下的NORMAL需要显示）
    let showSubMenu = false;// 是否显示子菜单
    const isSelected = Menu.isSelected(menuItem, componentUrl);
    const hasSubMenu = !!menuItem.subMenu;
    if (isSelected) {
      liClassName += ' select';
      this.currentSelectIndex = menuItem.index;
    }

    if (showMode == MINI) {
      textClassName = 'miniMenu';
      textShow = 'none';
      if (this.state.showSubMenuIndex == menuItem.index) {
        showSubMenu = true;
        textShow = 'block';
        subMenuClassName = 'miniSubMenu';
      }
    } else {
      // if (sideBar.openMenu.items.indexOf(menuItem.index) != -1) {
      if (true) {
        showSubMenu = true;
      }
      if (hasSubMenu) {
        arrow = Menu.buildArrowIcon(showSubMenu);
      }
    }

    let subMenu;
    if (hasSubMenu) {
      if (showMode == MINI) {
        subMenu = (<SubMenu
          subMenuClassName={subMenuClassName}
          visible={showSubMenu}
          subMenuData={menuItem.subMenu}
          sideBar={sideBar}
          componentUrl={componentUrl}
        />);
      } else {
        subMenu =
                    (<Animate
                      component=""
                      showProp="visible"
                      transitionAppear
                      transitionName="fade"
                    >
                      <SubMenu
                        subMenuClassName={subMenuClassName}
                        visible={showSubMenu}
                        subMenuData={menuItem.subMenu}
                        sideBar={sideBar}
                        componentUrl={componentUrl}
                      />
                    </Animate>);
      }
    }

    return (
      <li
        className={liClassName} key={index} onClick={this.menuClick.bind(this, menuItem)}
        onMouseOver={this.handlerMouseOver.bind(this, menuItem)}
        onMouseOut={this.handlerMouseOut.bind(this)}
      >
        <Icon type={menuItem.icon} />
        <span className={textClassName} style={{ display: textShow }}>
          {menuItem.text}
        </span>
        {arrow}

        {subMenu}
      </li>
    );
  }

  render() {
    const { menuData } = this.props;
    const menu = menuData.map((item, index) => {
      // if (item.show) {
      if (true) {
        return this.buildMenuItem(item, index);
      }
    });
    return (
      <span>
        <ul>
          {menu}
        </ul>
      </span>
    );
  }
}

Menu.propTypes = {};
Menu.defaultProps = {};

export default Menu;
