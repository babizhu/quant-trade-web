/**
 * Created by liu_k on 2015/11/27.
 * labe控件,用于显示一些带颜色背景的文字
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './label.less';

class Label extends Component {
  render() {
      // const dot = this.props.text;

    const style = this.props.isSuccess ? styles.success : styles.failure;
    // const  arr =  style }];
    return (
      <span className={classnames(styles.label, style)}>{this.props.text}</span>
    );
  }
}

Label.propTypes = {};
Label.defaultProps = { isSuccess: true };

export default Label;
