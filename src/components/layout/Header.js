import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Popover } from 'antd';
import classnames from 'classnames';
// import styles from './Header.less';
// import Menus from './Menu';

// const SubMenu = Menu.SubMenu;

const Header = ({user}) => {
  return (
    <div>
      <h1>{user.name}</h1>
	
    </div>
  );
};

Header.propTypes = {

};

export default Header;
