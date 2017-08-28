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
    pathArray.push(
      <span className={styles.nameOnly} key={item.text}> {item.text}</span>);
    pathArray.push(<span className={styles.separator}>{separator}</span>);
  };
  const renderLink = (item) => {
    // pathArray.push(<Link to={item.component}>
    //   <span className="name">{item.text}</span>
    // </Link>);
    pathArray.push(<span key={item.text} className="breadcrumb">
      <Link to={item.component}>
        <span className="name">{item.text}</span>
      </Link>
      <span className={styles.separator}>{separator}</span>
    </span>);
  };
  // const crumbs = (<Link to="/">
  //   <span className="name">home</span>
  // </Link>);
  const buildBread = (item) => {
    item.component ? renderLink(item) : renderName(item);
    if (item.component === path) {
      pathArray.push(separator);
      return true;
    } else if (item.subMenu) {
      for (const m of item.subMenu) {
        m.component ? renderLink(m) : renderName(m);
        if (m.component === path) {
          return true;
        }
      }
    }

    return false;
  };
  // console.log(pathArray);
  // let currentMenu;
  for (const tempMenu of menu) {
    const menuData = tempMenu.menu;
    if (menuData) {
      console.log(menuData);
      for (const m of menuData) {
        if (buildBread(m)) {
          break;
        } else {
          pathArray = [];
        }
      }
    }
  }
  // if (currentMenu) {
  //   crumbs = (<Link to={currentMenu.component}>
  //     <span className="name">{currentMenu.text}</span>
  //   </Link>);
  // }

  return (
    <div className={styles.breadcrumb}><Icon type="home" style={{ fontSize: '10px' }} /> {pathArray} </div>
  );
};
export default Breadcrumb;
