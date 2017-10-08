/**
 * Created by liu_k on 2016/3/31.
 * 侧边栏的用户信息部分
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';


// import {MINI,NORMAL} from '../../actions/SideBar'
// changeShowMode
import styles from '../Sidebar.less';

export default class UserProfile extends Component {


  render() {
    const { user, isFold } = this.props;

        // let user = this.props.userData;
        // let iconMode = this.props.iconMode;//是否仅显示图标模式
    let mediaStyle = {
      padding: '20px',
    };

    let mediaLeftStyle = {
      paddingRight: '10px',
    };

    let mediaShow = {
      display: 'table-cell',
    };

    if (isFold) {
      mediaStyle = {
        padding: '23px 10px',
      };
      mediaLeftStyle = {
        paddingRight: '0px',
      };
      mediaShow = {
        display: 'none',
      };
    }
    return (
      <div>
        <div className={styles.categoryContent}>
          <div className={styles.media} style={mediaStyle}>
            <div className={styles.mediaLeft} style={mediaLeftStyle}>
              <img src={user.iconUrl} className={styles.imgCircle} alt={user.name} />
            </div>

            <div className={styles.mediaBody} style={mediaShow}>
              <span>{user.name}</span>

              <div className={styles.textSizeMini}>
                <Icon type="environment-o" /> &nbsp;{user.address}
              </div>
            </div>

            <div className={styles.mediaRight} style={mediaShow}>
              <Icon type="setting" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    iconUrl: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  isFold: PropTypes.bool.isRequired,

};
UserProfile.defaultProps = {};

