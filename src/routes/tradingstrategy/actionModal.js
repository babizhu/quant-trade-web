import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Icon } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
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

  // const isDelete = () => {
  //   return modalOpts.modalType === 'delete';
  // };
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
          ...getFieldsValue(),
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
      return 'Create 策略';
    } else if (modalType === 'update') {
      return 'Update 策略';
    }
    return 'Delete 策略';
  };
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };
  const formatText = () => {
    return (<span style={{ lineHeight: '25px' }}>
      <div>名 称 : {item.name}</div>
      <div>类 名 : {item.modelClass}</div>
      <div>作 者 : {item.owner}</div>
      <div>描 述 : {item.desc}</div>
    </span>);
  };
  const buildDeleteForm = () => {
    return (
      <div modelClass={'ant-confirm-body'} style={{ margin: '15px', color: '#fa0' }}>
        <Icon modelClass={'anticon'} type="question-circle" />
        <span modelClass={'ant-confirm-title'}>确认要删除吗?</span>
        <div modelClass={'ant-confirm-content'}>{formatText()}</div>
      </div>
    );
  };
  const buildAEForm = () => {
    // console.log(item);
    return (
      <Form layout="horizontal">
        <FormItem label="名 称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input disabled={modalOpts.modalType === 'update'} />)}
        </FormItem>


        <FormItem label="作 者" hasFeedback {...formItemLayout}>
          {getFieldDecorator('owner', {
            initialValue: item.owner,
            rules: [
              {
                required: false,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="类 名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('modelClass', {
            initialValue: item.modelClass,
            rules: [
              {
                required: true,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="描 述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: item.desc,
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea placeholder="请输入该策略的详细描述" autosize={{ minRows: 2, maxRows: 6 }} />,
            )}
        </FormItem>


      </Form>
    );
  };
  // console.log(modalProps);
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
