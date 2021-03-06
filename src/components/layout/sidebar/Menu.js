/**
 * Created by liu_k on 2016/4/5.
 * 菜单有两种状态，选中状态和展开状态，处于选中状态的菜单一定处于展开状态，反之未必
 */
import React, { Component } from 'react';
import Animate from 'rc-animate';
import { Icon } from 'antd';
import classnames from 'classnames';
import SubMenu from './SubMenu';
import styles from '../Sidebar.less';

class Menu extends Component {
  /**
   * 设置当前菜单是否为选中状态
   * 1、菜单本身的component和currentPath相同，返回true
   * 2、菜单的任意子菜单的component和currentPath相同，返回true
   * @param menuItem    menuItem
   * @param currentPath currentPath
   */
  static isSelected(menuItem, currentPath) {
    const url = currentPath.substring(1);// 去除掉url最前面的/
    if (url === menuItem.component || url.split('/')[0] === menuItem.component) {
      return true;
    }
    if (menuItem.subMenu) {
      for (const subMenu of menuItem.subMenu) {
        if (subMenu.component === url || url.split('/')[0] === subMenu.component) {
          return true;
        }
      }
    }

    return false;
  }

  static buildArrowIcon(showSubMenu) {
    const arrowIcon = showSubMenu ? 'down' : 'right';
    return (
      <div className={styles.arrow}>
        <Icon type={arrowIcon} />
      </div>
    );
  }

  constructor() {
    super();
    // this.currentSelectIndex = -1;
    this.state = {
      showSubMenuIndex: [-1], // 侧边栏未收起时，需要显示子菜单的index集合
      showSubMenuIndexInFold: -1, // 侧边栏未收起后，需要显示的子菜单
    };
  }

  componentDidMount() {
    // const { changeMenuOpenStatus } = this.props;
    // if (this.currentSelectIndex !== -1) {
    //   changeMenuOpenStatus(this.currentSelectIndex);
    // }

  }

    /**
     * 设置子菜单是否展开
     * @param index
     */
  changeMenuOpenStatus(index) {
    const currentIndexArray = this.state.showSubMenuIndex;
    for (let i = currentIndexArray.length - 1; i >= 0; i--) {
      if (currentIndexArray[i] === index) {
        currentIndexArray.splice(i, 1);
        this.setState({ showSubMenuIndex: currentIndexArray });
        return;
      }
    }
    currentIndexArray.push(index);
    this.setState({ showSubMenuIndex: currentIndexArray });
  }

  handlerMouseOver(menuItem) {
    const { isFold } = this.props;

    if (isFold) {
      // console.log(menuItem.text + '.' + menuItem.index);
      this.setState({ showSubMenuIndexInFold: menuItem.index });
    }
  }

  // 鼠标移出
  handlerMouseOut() {
    const { isFold } = this.props;
    if (isFold) {
      this.setState({ showSubMenuIndexInFold: -1 });
    }
  }

  menuClick(menuItem) {
    // const { changeMenuOpenStatus } = this.props;
    this.changeMenuOpenStatus(menuItem.index);
  }


  /**
   * 生成菜单的一个子项
   * @param menuItem 菜单数据
   * @param index
   */
  buildMenuItem(menuItem, index) {
    const { currentPath, isFold, switchSider,bigScreen } = this.props;


    let arrow;// 菜单右边的箭头的显示内容
    let textClassName = '';// 菜单文本的className
    let subMenuClassName = '';// 子菜单的className
    let textShow = '';// 是否显示菜单文本（大屏幕下的侧边栏未收起的情况下需要显示）
    let showSubMenu = false;// 是否显示子菜单
    const isSelected = Menu.isSelected(menuItem, currentPath);
    const hasSubMenu = !!menuItem.subMenu;
    if (isFold) {
      textClassName = styles.miniMenu;
      textShow = 'none';
      subMenuClassName = styles.miniSubMenu;
      if (this.state.showSubMenuIndexInFold === menuItem.index) {
        showSubMenu = true;
        textShow = 'block';
      }
    } else {
      // if (sideBar.openMenu.items.indexOf(menuItem.index) != -1) {
      if (this.state.showSubMenuIndex.indexOf(menuItem.index) !== -1 || isSelected) {
        showSubMenu = true;
      }
      if (hasSubMenu) {
        arrow = Menu.buildArrowIcon(showSubMenu);
      }
    }

    // showSubMenu = true;//测试侧边栏
    let subMenu;
    if (hasSubMenu) {
      if (isFold) {
        subMenu = (<SubMenu
          subMenuClassName={subMenuClassName}
          visible={showSubMenu}
          currentPath={currentPath}
          switchSider={switchSider}
          isFold={isFold}
          bigScreen={bigScreen}
          subMenuData={menuItem.subMenu}
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
              switchSider={switchSider}
              bigScreen={bigScreen}

              isFold={isFold}
              subMenuClassName={subMenuClassName}
              visible={showSubMenu}
              subMenuData={menuItem.subMenu}
              currentPath={currentPath}
            />
          </Animate>);
      }
    }

    return (
      <li
        className={classnames(styles.navigationItem, { [styles.select]: isSelected })} key={index}
        onClick={this.menuClick.bind(this, menuItem)}
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
    // console.log(menuData);
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
