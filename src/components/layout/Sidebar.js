/* eslint-disable no-undef */
import React from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import MenuGroup from './sidebar/MenuGroup';
import UserProfile from './sidebar/UserProfile';
import styles from './Sidebar.less';
import {MINI,NORMAL} from '../../consts/Consts';
// eslint-disable-next-line no-undef
const Sidebar = ({ profile, menu }) => {
  console.log(menu);
  return (
    <div className={styles.siderbar} >
      <div className={styles.sidebarContent}>
        {<UserProfile profile={profile} showMode={NORMAL} />}
        <div className="sidebar-category">
          <div className="category-content no-padding">
            <ul className="navigation-ul">
              {menu.map((menuGroup, index) => {
                if (true || menuGroup.show) {
                  return (
                    <MenuGroup key={index} menuGroup={menuGroup} />
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
