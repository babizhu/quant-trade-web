/**
 * Created by liu_k on 2016/4/12.
 * 内容页面上部的导航条
 */

import React from 'react';
import pathToRegexp from 'path-to-regexp';

import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import styles from './Breadcrumb.less';

const Breadcrumb = ({ menu, separator, currentPath }) => {
  // const path = currentPath.replace('/', '');
  const renderName = (item,pathArray) => {
    pathArray.push(<span key={item.text} className="breadcrumb">
      <span className={styles.nameOnly} key={item.text}> {item.text}</span>
      <span className={styles.separator}>{separator}</span>
    </span>);
  };
  const renderLink = (item,pathArray) => {
    pathArray.push(<span key={item.text} className="breadcrumb">
      <Link to={item.component}>
        <span className={styles.nameOnly}>{item.text}</span>
      </Link>
      <span className={styles.separator}>{separator}</span>
    </span>);
  };
  const build=(subMenu,pathArray)=>{
    if (subMenu.component !== undefined) {
      renderLink(subMenu,pathArray);
    } else {
      renderName(subMenu,pathArray);
    }
    // if( subMenu.path === '/trade/:id'){
    //   console.log('xxxxxxxxxxxxxx')
    // }
    // if(subMenu.path && pathToRegexp(subMenu.path).exec(currentPath)){
    //   return true;
    // }
    // if( subMenu.subMenu){
    //   build(subMenu.subMenu,pathArray);
    // }else {
    //   return false;
    // }

  };
  const getSubMenu=(sm,pathArray)=> {
    if (sm.subMenu !== undefined) {
      for (const subMenu of sm.subMenu) {
        console.log(subMenu);
        console.log(pathArray)
        if( subMenu.path === '/trade/:id'){
          console.log('xxxxxxxxxxxxxx')
        }
        // let pathArray = [];

        build(subMenu,pathArray);
        if(subMenu.path && pathToRegexp(subMenu.path).exec(currentPath)){
          console.log('3333=');
          console.log(pathArray)
          return;
        }

        if( subMenu.subMenu){
          getSubMenu(subMenu,pathArray);
        }else {
          pathArray = [];
        }

      }
      pathArray =  null;
    }
  };
  const getMenu = ()=>{
    for (const menuGroup of menu) {
      for (const m of menuGroup.menu) {
        // console.log('\t' + m.text + '['+m.path+']');
        let pathArray =[];
          getSubMenu(m,pathArray);
        if(pathArray !== null ){
          console.log('444444=');
          console.log(pathArray)
          return pathArray
        }

      }
    }

    return null;
  };

  // console.log(getMenu())
  const printSubMenu = (sm) => {
    if( sm.subMenu !== undefined ) {
      for (const subMenu of sm.subMenu) {
        console.log('\t\t' + subMenu.text)
        printSubMenu(subMenu);
      }
      // console.log('\t\t'+sm.text);
      // if (sm.subMenu!==undefined) {
      //   printSubMenu(sm.subMenu);
      // }
    }
  };
  const printMenu = () => {
    for (const menuGroup of menu) {
      console.log(menuGroup.text);
      for (const m of menuGroup.menu) {
        console.log('\t'+m.text);
        // for(const subMenu of m.subMenu){
          // console.log( '\t\t'+subMenu.text)
          printSubMenu(m);
        // }
      }
    }
  };
  // printMenu();
  let pathArray = [];
  // const renderName = (item) => {
  //   // pathArray.push(
  //   //   <span className={styles.nameOnly} key={item.text}> {item.text}</span>);
  //   // pathArray.push(<span className={styles.separator}>{separator}</span>);
  //
  //   pathArray.push(<span key={item.text} className="breadcrumb">
  //     <span className={styles.nameOnly} key={item.text}> {item.text}</span>
  //     <span className={styles.separator}>{separator}</span>
  //   </span>);
  // };
  // const renderLink = (item) => {
  //   pathArray.push(<span key={item.text} className="breadcrumb">
  //     <Link to={item.component}>
  //       <span className={styles.nameOnly}>{item.text}</span>
  //     </Link>
  //     <span className={styles.separator}>{separator}</span>
  //   </span>);
  // };

  const buildBread = (item) => {
    if (item.component !== undefined) {
      renderLink(item,pathArray);
    } else {
      renderName(item,pathArray);
    }
    if (item.component === currentPath) {
      pathArray.push(separator);
      return true;
    } else if (item.subMenu) {
      for (const m of item.subMenu) {
        // if (m.component !== undefined) {
        //   renderLink(m);
        // } else {
        //   renderName(m);
        // }

        if (m.component === currentPath) {
          if (m.component !== undefined) {
            renderLink(m,pathArray);
          } else {
            renderName(m,pathArray);
          }
          return true;
        }
      }
    }

    return false;
  };
  if (currentPath === '/' || currentPath === '/dashboard') { // 根路径和dashboard在menuData中不存在，所以特殊处理
    const m = { text: 'Home' };
    renderName(m,pathArray);
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
      renderName(m,pathArray);
    }
  }
  const homeLink =
    (<span className={styles.homeLink}>
      <Link to="/">
        <span className={styles.nameOnly}><Icon type="home" style={{ fontSize: '10px' }} /></span>
      </Link>
      <span className={styles.separator}>{separator}</span>
    </span>);
  const  x = getMenu();
  console.log('===============');
  console.log(x)
  return (
    <div className={styles.breadcrumb}>
      {homeLink}
      {x}
    </div>
  );
};
export default Breadcrumb;
