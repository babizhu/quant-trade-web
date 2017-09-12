import React from 'react';
// import classnames from 'classnames';
import { Table, Icon, Input, Button, Dropdown, Menu, Tooltip } from 'antd';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import ActionModal from './actionModal';
import { showError } from '../../index';

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
  const onEditItem = (item) => {
    dispatch({
      type: 'user/showModal',
      payload: {
        modalType: 'update',
        currentItem: item,
      },
    });
  };

  const onDeleteItem = (item) => {
    if (item.username === 'admin') {
      // const err = { eid: 999 };
      showError({ url: '', msg: '无法删除最高管理员admin!' });
      return;
    }
    dispatch({
      type: 'user/showModal',
      payload: {
        modalType: 'del',
        currentItem: item,
      },
    });
  };

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    // title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    modalType,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      // console.log(data);
      // console.log('modalType='+modalType);
      dispatch({
        type: modalType === 'del' ? 'user/delete' : 'user/save',
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
    title: '用户',
    dataIndex: 'username',
    key: 'name',
  }, {
    title: '角色',
    dataIndex: 'roles',
    key: 'roles',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '邮件',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <div>
          <span className="table-actions">
            <Tooltip title="编辑">
              <Button type="ghost" className="button" onClick={() => onEditItem(record)}>
                <Icon type="edit" />
              </Button>
            </Tooltip>
            <Tooltip title="删除">
              <Button
                type="ghost"
                className="button"
                onClick={() => onDeleteItem(record)}
              >
                <Icon type="delete" />
              </Button>
            </Tooltip>

          </span>
        </div>
      );
    },
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
          }} style={{ width: '35%' }}
        />
        <div style={{ float: 'right' }}>
          <Button
            type="primary" icon="reload" onClick={refresh}
            className={styles.button}
          />
          <Button type="ghost" icon="plus" className={styles.button} onClick={onAdd}>添加</Button>
          <DropdownButton overlay={menu} trigger={['click', 'hover']}>
                        更多操作
                    </DropdownButton>
        </div>

      </div>
      <Table
        columns={columns} dataSource={list}
        rowKey={record => record._id}
        loading={loading.effects['user/query']}
      />
      {modalVisible && <ActionModal {...modalProps} />}
    </div>
  );
};

User.propTypes = {};
export default connect(({ user, loading }) => ({ user, loading }))(User);

