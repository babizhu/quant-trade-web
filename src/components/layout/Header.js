/* eslint-disable no-undef */
import React from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import Iconfont from '../Iconfont/Iconfont';

// const SubMenu = Menu.SubMenu;
import styles from './Header.less';
import '../../svg/emoji/stage.svg';

// eslint-disable-next-line no-undef
const Header = ({ user, switchSider, logout }) => {
  const handleClickMenu = e => e.key === 'logout' && logout();
  const menu = (<div style={{ width: '100%' }}><Menu>


    <Menu.Item>
      <span><img src="/img/gb.png" alt="" /> English</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/img/gb.png" alt="" style={{ paddingTop: '1px' }} /> English</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/img/gb.png" alt="" style={{ paddingTop: '1px' }} /> 中 国</span>
    </Menu.Item>

  </Menu></div>);
  const menu1 = (<div><Menu onClick={handleClickMenu} >

    <Menu.Item>
      <Icon type="aliwangwang" /><span> 我的资料</span>
    </Menu.Item>
    <Menu.Item>
      <Icon type="plus-circle" /><span> 我的朋友</span>
    </Menu.Item>
    <Menu.Divider className="menu-divider" />
    <Menu.Item key="logout">
      <Icon type="minus-circle" /> <span>退出系统</span>
    </Menu.Item>

  </Menu></div>);

  return (
    <div className={styles.header}>
      <div className={styles.brand}>
        <ul>
          <li className={styles.leftIcon}>
            <img src="/logo.png" alt="必发财炒股鸡" />
          </li>

        </ul>
      </div>

      <div className={styles.headerMiddle}>
        <ul>
          <li onClick={switchSider}><Icon type="bars" className={styles.icon} /></li>
          {/*<li>*/}

            {/*<Iconfont colorful type={require('../../svg/emoji/stage.svg')} />*/}
            {/*<Icon type="github" className={styles.icon} />*/}
            {/*<span className={styles.visibleXsInlineBlock}> Git updates</span>*/}

          {/*</li>*/}
          <li>{new Date().toLocaleDateString()}</li>
        </ul>
      </div>

      <div className={styles.headerRight}>
        <ul>
          <Dropdown overlay={menu}>
            <li>
              <span>
                <img src="/img/gb.png" alt="" style={{ paddingTop: '1px' }} /> English <Icon type="down" className={styles.downIcon} />
              </span>
            </li>
          </Dropdown>

          <Dropdown overlay={menu1}>
            <li className={styles.person}>
              <span>
                <img src={user.iconUrl} alt="用户" /> {user.name}  <Icon type="down" className={styles.downIcon} />
              </span>
            </li>
          </Dropdown>
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
