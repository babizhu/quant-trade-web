import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Icon, InputNumber } from 'antd';

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
          userName: 'admin',
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
      return '新建 交易';
    } else if (modalType === 'update') {
      return 'Update 交易';
    }
    return 'Delete 交易';
  };
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };
  const formatText = () => {
    return (<span style={{ lineHeight: '25px' }}>
      <div>名 称 : {item.name}</div>
      <div>策 略 : {item.className}</div>
      <div>运行频率 : {item.owner}</div>
      <div>初始资金 : {item.desc}</div>
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
        <FormItem label="交易名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input disabled={modalOpts.modalType === 'update'} />)}
        </FormItem>


        <FormItem label="交易策略" hasFeedback {...formItemLayout}>
          {getFieldDecorator('strategyId', {
            initialValue: item.strategyId,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="初始资金" hasFeedback {...formItemLayout}>
          {getFieldDecorator('initBalance', {
            initialValue: item.initBalance === undefined ? 100000 : item.initBalance,
            rules: [
              {
                required: true,
                message: 'The input is not valid phone!',
              },
            ],
          })(<InputNumber
            placeholder="请输入初始资金"
            formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}

          />)}
        </FormItem>
        <FormItem label="股票代码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('stocks', {
            initialValue: item.stocks,
            rules: [
              {
                required: true,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input placeholder="请输入股票代码，多只股票请用半角逗号隔开" />)}
        </FormItem>
        <FormItem label="运行参数" hasFeedback {...formItemLayout}>
          {getFieldDecorator('arguments', {
            initialValue: item.arguments,
            rules: [
              {
                required: false,
              },
            ],
          })(<TextArea placeholder="请填入运行时参数" autosize={{ minRows: 3, maxRows: 6 }} />)}
        </FormItem>
        <FormItem label="描 述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: item.desc,
            rules: [
              {
                required: false,
              },
            ],
          })(<TextArea placeholder="请输入详细描述" autosize={{ minRows: 3, maxRows: 6 }} />)}
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
