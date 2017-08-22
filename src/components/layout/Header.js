import React from 'react';
import {Icon, Menu,Dropdown} from 'antd';
// import Menus from './Menu';

// const SubMenu = Menu.SubMenu;
import styles from './Header.less';

const Header = ({user}) => {
  const menu = <div style={{width: '100%'}}><Menu>

    <Menu.Item>
      <span><img src='/img/gb.png' alt=''/> English</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src='/img/gb.png' alt='' style={{paddingTop: '1px'}}/> English</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src='/img/gb.png' alt='' style={{paddingTop: '1px'}}/> 中 国</span>
    </Menu.Item>

  </Menu></div>;
  const menu1 = <div><Menu>

    <Menu.Item>
      <Icon type="aliwangwang"/><span> 我的资料</span>
    </Menu.Item>
    <Menu.Item>
      <Icon type="plus-circle"/><span> 我的朋友</span>
    </Menu.Item>
    <Menu.Divider className="menu-divider"/>
    <Menu.Item>
      <Icon type="minus-circle"/> <span>退出系统</span>
    </Menu.Item>

  </Menu></div>;

  return (


    <div className={styles.header}>
      <div className={styles.brand}>
        <ul>
          <li className={styles.leftIcon}>
            <a href='/'>
              <img src='/img/logo_light.png' alt=''/>
            </a>
          </li>
          <li className={styles.mobileIcon} >
            <Icon type="appstore" className={styles.icon}/>
          </li>
          <li className={styles.mobileIcon}>
            <Icon type="bars" className={styles.icon}/>
          </li>
        </ul>
      </div>

      <div className={styles.headerMiddle}>
        <ul>
          <li ><Icon type="bars" className={styles.icon}/></li>
          <li>
            <Icon type="github" className={styles.icon}/>
            <span className={styles.visibleXsInlineBlock}>Git updates</span>

          </li>
          <li>{new Date().toLocaleDateString()}</li>
        </ul>
      </div>

      <div className={styles.headerRight}>
        <ul>


          <Dropdown overlay={menu}>
            <li className='lang'>
                            <span>
                                <img src='/img/gb.png' alt='' style={{paddingTop: '1px'}}/>
                                English <Icon type="down" className={styles.downIcon}/>
                            </span>
            </li>
          </Dropdown>
          <li className='msg'>
            <Icon type="aliwangwang-o" className={styles.headerIcon}/>
            <span className={styles.visibleXsInlineBlock}>短 信</span>

          </li>
          <Dropdown overlay={menu1}>
            <li className='person'>
                            <span>
                                <img src={user.iconUrl} alt=''/>
                                <span>{user.name} <Icon type="down" className="downIcon"/></span>
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
