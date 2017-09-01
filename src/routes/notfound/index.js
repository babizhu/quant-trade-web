import React from 'react';
import { Icon,Row,Col } from 'antd';
import { Link } from 'react-router';

import styles from './index.less';

const NotFoundError = () => (
  <Row type="flex" justify="center"  align="bottom">
    <Col>
      <div className={styles.error}  style={{height:'100%'}}>
      <Icon type="frown-o" />
      <h1>404 Not Found</h1>
      <Link to={'/'}>
        返回主页
      </Link>
      </div>
    </Col>

  </Row>

);

export default NotFoundError;
