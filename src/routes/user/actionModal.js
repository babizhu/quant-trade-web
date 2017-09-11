import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Icon } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const ActionModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const isUpdate = () => {
    return modalOpts.modalType === 'update';
  };
  // noinspection JSUnusedLocalSymbols
  const isDelete = () => {
    return modalOpts.modalType === 'delete';
  };
  const isCreate = () => {
    return modalOpts.modalType === 'create';
  };
  const handleOk = () => {
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      let data;
      if (isUpdate()) { // update
        data = {
          email: values.email,
          phone: values.phone,
          roles: values.roles,
          address:values.address,
          _id: item._id,
        };
      } else if (isCreate()) {
        data = {
          ...getFieldsValue(),
          _id: '-1',
        };
      } else {
        data = {
          _id: item._id,
        };
      }
      // data.address = data.address.join(' ');
      onOk(data);
    });
  };
  const buildModalTitle = (modalType) => {
    if (modalType === 'create') {
      return 'Create User';
    } else if (modalType === 'update') {
      return 'Update User';
    }
    return 'Delete User';
  };
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };
  const formatText = () => {
    return (<span style={{ lineHeight: '25px' }}>
      <div>用户 : {item.username}</div>
      <div>角色 : {item.roles}</div>
      <div>地址 : {item.address}</div>
      <div>电话 : {item.phone}</div>
      <div>邮件 : {item.email}</div>
    </span>);
  };
  const buildDeleteForm = () => {
    return (
      <div className={'ant-confirm-body'} style={{ margin: '15px', color: '#fa0' }}>
        <Icon className={'anticon'} type="question-circle" />
        <span className={'ant-confirm-title'}>确认要删除吗?</span>
        <div className={'ant-confirm-content'}>{formatText()}</div>
      </div>
    );
  };
  const buildAEForm = () => {
    // console.log(item);
    return (
      <Form layout="horizontal">
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input disabled={modalOpts.modalType === 'update'} />)}
        </FormItem>
        {!item.password &&
          <FormItem label="密 码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
              }
        <FormItem label="角 色" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roles', {
            initialValue: item.roles,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="地 址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              {
                required: false,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="E-mail" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>

      </Form>
    );
  };
  console.log(modalProps);
  return (
    <Modal {...modalOpts} title={buildModalTitle(modalOpts.modalType)}>
      {modalOpts.modalType === 'del' ? buildDeleteForm() : buildAEForm()}
    </Modal>
  );
};

ActionModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(ActionModal);
