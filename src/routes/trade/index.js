import React from 'react';
// import classnames from 'classnames';
import { Table, Icon, Input, Button, Dropdown, Menu, Tooltip } from 'antd';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import ActionModal from './actionModal';
// import { showError } from '../../index';

import styles from './index.less';

const Search = Input.Search;
const DropdownButton = Dropdown.Button;

const Trade = ({ dispatch, trade, loading }) => {
  const { list, modalVisible, modalType, currentItem, pagination } = trade;
  const onAdd = () => {
    dispatch({
      type: 'trade/showModal',
      payload: {
        modalType: 'create',
      },
    });
  };
  const onEditItem = (item) => {
    dispatch({
      type: 'trade/showModal',
      payload: {
        modalType: 'update',
        currentItem: item,
      },
    });
  };

  const onDeleteItem = (item) => {
    dispatch({
      type: 'trade/showModal',
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
    confirmLoading: loading.effects['trade/update'],
    modalType,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      // console.log(data);
      // console.log('modalType='+modalType);
      dispatch({
        type: modalType === 'del' ? 'trade/delete' : 'trade/save',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'trade/hideModal',
      });
    },
  };
  const refresh = () => {
    dispatch({
      type: 'trade/query',
      payload: '',
    });
  };

  const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '策略',
    dataIndex: 'strategy',
    key: 'strategy',
  }, {
    title: '初始资金',
    dataIndex: 'cash',
    key: 'cash',
  }, {
    title: '参数',
    dataIndex: 'arguments',
    key: 'arguments',
  }, {
    title: '开始日期',
    dataIndex: 'beginDate',
    key: 'beginDate',
  }, {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <div>
          <span>
            <Tooltip title="编辑">

              <Icon
                className={styles.actionButton} type="edit"
                onClick={() => onEditItem(record)} style={{ fontSize: 16 }}
              />

            </Tooltip>
            <Tooltip title="删除">

              <Icon type="delete" style={{ fontSize: 16, color: '#08c' }} onClick={() => onDeleteItem(record)} />

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
    <div className={styles.trade}>
      <div className={styles.listHeader}>
        <Search
          placeholder="search by name or description" onSearch={(keyword) => {
            console.log(keyword);
          }} style={{ width: '35%' }}
        />
        <div style={{ float: 'right' }}>
          <Button
            type="primary" icon="reload" onClick={refresh}
            className={styles.headButton}
          />
          <Button type="ghost" icon="plus" className={styles.headButton} onClick={onAdd}>添加</Button>
          <DropdownButton overlay={menu} trigger={['click', 'hover']}>
                        更多操作
                    </DropdownButton>
        </div>

      </div>
      <Table
        pagination={pagination}
        columns={columns} dataSource={list}
        rowKey={record => record._id}
        loading={loading.effects['trade/query']}
      />
      {modalVisible && <ActionModal {...modalProps} />}
    </div>
  );
};

Trade.propTypes = {};
export default connect(({ trade, loading }) => ({ trade, loading }))(Trade);

