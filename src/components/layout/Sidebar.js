import React from 'react';
import PropTypes from 'prop-types';
import MenuGroup from './sidebar/MenuGroup';
import UserProfile from './sidebar/UserProfile';
import styles from './Sidebar.less';

const Sidebar = ({ user, menu, currentPath, isFold, bigScreen, switchSider }) => {
  let widthValue;
  // console.log(document.body.clientWidth)
  if (bigScreen) {
    if (isFold) { // 大屏幕下的mini模式，也就是仅显示菜单图标
      widthValue = 'auto';
    } else {
      widthValue = '240px';
    }
        // displayMode = 'table-cell';
  } else {
    widthValue = '100%';
  }
  const menuGroupProps = {
    isFold,
    currentPath,
    bigScreen,
    switchSider,
  };
  return (
    <div className={styles.sidebar} style={{ width: widthValue }} >
      <div className={styles.sidebarContent} >
        {<UserProfile user={user} isFold={isFold} />}
        <div className={styles.sidebarCategory}>
          <div className={styles.categoryContent}>
            <ul className={styles.navigationUl}>
              {menu.map((menuGroup, index) => {
                if (true || menuGroup.show) {
                  return (
                    <MenuGroup key={index} menuGroup={menuGroup} {...menuGroupProps} />
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
    switchSider: PropTypes.func.isRequired,
};

export default Sidebar;
