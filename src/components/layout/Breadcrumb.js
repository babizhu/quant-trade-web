/**
 * Created by liu_k on 2016/4/12.
 * 内容页面上部的导航条
 */

import React from 'react';

import { Link } from 'react-router';
import { Icon } from 'antd';
import styles from './Breadcrumb.less';

const Breadcrumb = ({ menu, separator, currentPath }) => {
  const path = currentPath.replace('/', '');

  let pathArray = [];
  const renderName = (item) => {
    // pathArray.push(
    //   <span className={styles.nameOnly} key={item.text}> {item.text}</span>);
    // pathArray.push(<span className={styles.separator}>{separator}</span>);

    pathArray.push(<span key={item.text} className="breadcrumb">
      <span className={styles.nameOnly} key={item.text}> {item.text}</span>
      <span className={styles.separator}>{separator}</span>
    </span>);
  };
  const renderLink = (item) => {
    pathArray.push(<span key={item.text} className="breadcrumb">
      <Link to={item.component}>
        <span className={styles.nameOnly}>{item.text}</span>
      </Link>
      <span className={styles.separator}>{separator}</span>
    </span>);
  };

  const buildBread = (item) => {
    if (item.component !== undefined) {
      renderLink(item);
    } else {
      renderName(item);
    }
    if (item.component === path) {
      pathArray.push(separator);
      return true;
    } else if (item.subMenu) {
      for (const m of item.subMenu) {
        if (m.component !== undefined) {
          renderLink(m);
        } else {
          renderName(m);
        }
        if (m.component === path) {
          return true;
        }
      }
    }

    return false;
  };
  if (path === '' || path === 'dashboard') {
    const m = { text: 'Home' };
    renderName(m);
  } else {
  // console.log(pathArray);
  // let currentMenu;
    let isFound = false;
    outer:
  for (const tempMenu of menu) {
    const menuData = tempMenu.menu;
    if (menuData) {
      // console.log(menuData);
      for (const m of menuData) {
        if (buildBread(m)) {
          isFound = true;
          break outer;
        } else {
          pathArray = [];
        }
      }
    }
  }
    if (!isFound) {
    // alert('not found');
      const m = { text: '404 Not Found' };
      renderName(m);
    }
  }
  const homeLink =
    (<span className={styles.homeLink}>
      <Link to="/">
        <span className={styles.nameOnly}><Icon type="home" style={{ fontSize: '10px' }} /></span>
      </Link>
      <span className={styles.separator}>{separator}</span>
    </span>);

  return (
    <div className={styles.breadcrumb}>
      {homeLink}
      {pathArray}
    </div>
  );
};
export default Breadcrumb;
