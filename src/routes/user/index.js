import React from 'react';
import classnames from 'classnames'
import { Table, Icon } from 'antd';
import PropTypes from 'prop-types';

import { connect } from 'dva';
import styles from './index.less';

const User = ({ location, dispatch, user, loading }) => {

  const { users,list } = user;


  // const columns = [
  //   {
  //     title: 'Avatar',
  //     dataIndex: 'avatar',
  //     key: 'avatar',
  //     width: 64,
  //     className: styles.avatar,
  //     render: text => <img alt={'avatar'} width={24} src={text} />,
  //   }, {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
  //   }, {
  //     title: 'NickName',
  //     dataIndex: 'nickName',
  //     key: 'nickName',
  //   }, {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     key: 'age',
  //   }, {
  //     title: 'Gender',
  //     dataIndex: 'isMale',
  //     key: 'isMale',
  //     render: text => (<span>{text
  //       ? 'Male'
  //       : 'Female'}</span>),
  //   }, {
  //     title: 'Phone',
  //     dataIndex: 'phone',
  //     key: 'phone',
  //   }, {
  //     title: 'Email',
  //     dataIndex: 'email',
  //     key: 'email',
  //   }, {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     key: 'address',
  //   }, {
  //     title: 'CreateTime',
  //     dataIndex: 'createTime',
  //     key: 'createTime',
  //   }, {
  //     title: 'Operation',
  //     key: 'operation',
  //     width: 100,
  //     render: (text, record) => {
  //       return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
  //     },
  //   },
  // ]
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
    ),
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'London No. 1 Lake Park',
  }
    , {
      key: '4',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '5',
      name: 'Joe Black',
      age: 32,address: 'London No. 1 Lake Park',
    }
    , {
      key: '6',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
  }];


  return (
  <div style={{backgroundColor:'white'}}>
  <Table columns={columns} dataSource={data} />
  </div>
  );
};

User.propTypes = {
};
export default connect(({ user }) => ({ user }))(User);

