import React from 'react';
// import classnames from 'classnames';
import { Table, Icon, Input, Button, Dropdown, Menu } from 'antd';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Modal from './Modal';
import styles from './index.less';

const Search = Input.Search;
const DropdownButton = Dropdown.Button;

const User = ({ dispatch, user, loading }) => {
  const { list, modalVisible, modalType, currentItem } = user;
  const onAdd = () => {
    dispatch({
      type: 'user/showModal',
      payload: {
        modalType: 'create',
      },
    });
  };


  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'user/hideModal',
      });
    },
  };
  const refresh = () => {
    dispatch({
      type: 'user/query',
      payload: '',
    });
  };

  const columns = [{
    title: 'Name',
    dataIndex: 'username',
    key: 'name',
  }, {
    title: '角色',
    dataIndex: 'roles',
    key: 'roles',
  }, {
    title: '居住地址',
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
    <div className={styles.user}>
      <div className={styles.userListHeader}>
        <Search
          placeholder="search by name or description" onSearch={(keyword) => {
            console.log(keyword);
          }} style={{ width: '25%' }}
        />
        <div style={{ float: 'right' }}>
          <Button
            type="primary" icon="reload" onClick={refresh}
            className={styles.button}
          />
          <Button type="ghost" icon="plus" className={styles.button} onClick={onAdd}>添加</Button>
          <DropdownButton overlay={menu}>
                        更多操作
                    </DropdownButton>
        </div>

      </div>
      <Table columns={columns} dataSource={list} rowKey={record => record._id} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

User.propTypes = {};
export default connect(({ user, loading }) => ({ user, loading }))(User);

