import React from 'react';
// import { Icon, Menu, Dropdown } from 'antd';
import MenuGroup from './sidebar/MenuGroup';
import UserProfile from './sidebar/UserProfile';
import styles from './Sidebar.less';
import {NORMAL} from '../../consts/Consts';
const Sidebar = ({ profile, menu }) => {
  console.log(menu);
  return (
    <div className={styles.sidebar} >
      <div className={styles.sidebarContent}>
        {<UserProfile profile={profile} showMode={NORMAL} />}
        <div className={styles.sidebarCategory}>
          <div className={styles.categoryContent}>
            <ul className={styles.navigationUl}>
              {menu.map((menuGroup, index) => {
                if (true || menuGroup.show) {
                  return (
                    <MenuGroup key={index} menuGroup={menuGroup} showMode={NORMAL}/>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
