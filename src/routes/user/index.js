import React from 'react';
import classnames from 'classnames';
import { Table, Icon, Input, Button, Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const Search = Input.Search;
const DropdownButton = Dropdown.Button;
import styles from './index.less';

const User = ({ location, dispatch, user, loading }) => {
  const { users, list } = user;

  const refresh = () => {};

  const columns = [{
    title: 'Name',
    dataIndex: 'username',
    key: 'name',
  }, {
    title: '角色',
    dataIndex: 'roles',
    key: 'roles',
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

  const menu = (
    <Menu>
      <Menu.Item key="1">上传EXCEL</Menu.Item>
    </Menu>
    );
  return (
    <div style={{ backgroundColor: 'white' }}>
      <div style={{ margin: '10px 0px', height: 'auto', minWidth: '560px' }}>


        <Search placeholder="search by name or description" onSearch={(keyword) => { console.log(keyword); }} style={{ width: '25%' }} />
        <div style={{ float: 'right' }}>
          <Button
            type="primary" icon="reload" onClick={refresh}
            className="button"
          />
          <Button
            type="ghost" icon="plus" className="button"
          >
            添加</Button>

          <DropdownButton overlay={menu} type="primary" style={{ margin: '0px 6px' }}>
            更多操作
          </DropdownButton>
        </div>

      </div>
      <Table columns={columns} dataSource={list} rowKey={record => record._id} />
    </div>
  );
};

User.propTypes = {
};
export default connect(({ user }) => ({ user }))(User);

