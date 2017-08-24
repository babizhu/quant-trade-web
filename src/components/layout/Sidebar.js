import React from 'react';
import PropTypes from 'prop-types';
// import { Icon, Menu, Dropdown } from 'antd';
import MenuGroup from './sidebar/MenuGroup';
import UserProfile from './sidebar/UserProfile';
import styles from './Sidebar.less';
import { NORMAL } from '../../consts/Consts';

const Sidebar = ({ user, menu, currentPath, isFold }) => {
  return (
    <div className={styles.sidebar} >
      <div className={styles.sidebarContent}>
        {<UserProfile user={user} isFold={isFold} />}
        <div className={styles.sidebarCategory}>
          <div className={styles.categoryContent}>
            <ul className={styles.navigationUl}>
              {menu.map((menuGroup, index) => {
                if (true || menuGroup.show) {
                  return (
                    <MenuGroup key={index} menuGroup={menuGroup} showMode={NORMAL} currentPath={currentPath} />
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

Sidebar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    iconUrl: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  isFold: PropTypes.bool.isRequired,
};

export default Sidebar;
