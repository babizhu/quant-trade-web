import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { withRouter } from 'dva/router';
import { Button, Row, Form, Input } from 'antd';
import { config } from '../../utils';
import JSEncrypt from '../../utils/jsencrypt';
import { PUBLIC_KEY } from '../../consts/Key';
import styles from './index.less';

const FormItem = Form.Item;

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading } = login;

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(PUBLIC_KEY);
      const password = encrypt.encrypt(values.password);
      dispatch({ type: 'login/login', payload: { username: values.username, password } });
    });
  }

  // noinspection RequiredAttributes
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(<Input
            size="large" onPressEnter={handleOk} placeholder="Username"
          />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            initialValue: 'admin',
            rules: [
              {
                required: true,
              },
            ],
          })(<Input

            size="large" type="password" onPressEnter={handleOk} placeholder="Password"
          />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
            Sign in
          </Button>
          <p>
            <span>Username：admin</span>
            <span>Password：admin</span>
          </p>
        </Row>

      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

// noinspection JSUnusedGlobalSymbols
export default connect(({ login }) => ({ login }))(Form.create()(Login));
// export default withRouter(connect(({ login }) => ({ login }))(Login));
