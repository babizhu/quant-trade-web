import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router';

import styles from './index.less';

const NotFoundError = () => (<div className={styles.error}>
  <div className={styles.contentInner}>
    <Icon type="frown-o" />
    <h1>404 Not Found</h1>
    <Link to={'/'}>
      返回主页
    </Link>
  </div>
</div>);

export default NotFoundError;
