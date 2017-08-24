import React from 'react';
import PropTypes from 'prop-types';
import MenuGroup from './sidebar/MenuGroup';
import UserProfile from './sidebar/UserProfile';
import styles from './Sidebar.less';

const Sidebar = ({ user, menu, currentPath, isFold, bigScreen }) => {
  let widthValue = isFold?'auto':'240px';
  return (
    <div className={styles.sidebar} style={{width:widthValue}}>
      <div className={styles.sidebarContent}>
        {<UserProfile user={user} isFold={isFold} />}
        <div className={styles.sidebarCategory}>
          <div className={styles.categoryContent}>
            <ul className={styles.navigationUl}>
              {menu.map((menuGroup, index) => {
                if (true || menuGroup.show) {
                  return (
                    <MenuGroup key={index} menuGroup={menuGroup} isFold={isFold} currentPath={currentPath} bigScreen={bigScreen} />
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
  bigScreen: PropTypes.bool.isRequired,
};

export default Sidebar;
