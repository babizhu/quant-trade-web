import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      let data;
      if (item._id) { // update
        data = {
          email: values.email,
          phone: values.phone,
          roles: values.roles,
          _id: item._id,
        };
      } else {
        data = {
          ...getFieldsValue(),
          _id: -1,
        };
      }
      // data.address = data.address.join(' ');
      onOk(data);
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密 码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
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
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(modal);
