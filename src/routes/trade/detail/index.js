import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Col, Row, Button, Tabs, Card } from 'antd';
import classnames from 'classnames';
import Label from '../../../components/Utils/Label';
import StockReturnsChart from './StockReturnsChart';
import styles from './index.less';

const TabPane = Tabs.TabPane;
const Detail = ({ tradeDetail }) => {
  const { data } = tradeDetail;
  const content = [];
  for (const key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(<div key={key} className={styles.item}>
        <div>{key}</div>
        <div>{String(data[key])}</div>
      </div>);
    }
  }
  const buildActionButton = () => {
    if (!data.status || data.status === 0 || data.status === 2) { // 交易处于停止状态,或者暂停状态
      return (<Button type="ghost" icon="right" className={styles.actionButton}>开始交易</Button>);
    } else { // 交易处于运行状态
      return (<span><Button type="ghost" icon="reload" className={styles.actionButton}>暂停交易</Button>
        <Button type="ghost" icon="right" className={styles.actionButton}>关闭交易</Button></span>
      );
    }
  };
  const buildBalanceStatus = () => {
    return (
      <Row type="flex" justify="space-between" className={styles.databar}>
        <Col xs={8} md={4}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}>累计收益</div>
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}>年化收益</div>
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}>可用资金</div>
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}>总体仓位</div>
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}>总资产</div>
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}>最大回撤</div>
          </div>
        </Col>

      </Row>
    );
  };
  return (<div className={styles.content}>
    <div className={styles.head}>
      <div>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td><span className={styles.name}>{data.name}</span>
                <span className={styles.label}><Label text={'运行中'} isSuccess /></span></td>
              <td style={{ float: 'right' }}>
                {buildActionButton()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ lineHeight: '25px' }}>
        <div className="desc">{data.desc}</div>
      </div>
    </div>

    {buildBalanceStatus()}

    <div className={styles.pannel}>
      <Tabs tabPosition="top">
        <TabPane tab="交易总览" key="dashboard">
          <div style={{ background: '#ECECEC', padding: '6px' }}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Card title="历史收益" bordered={false} >
                  <StockReturnsChart />
                </Card>
                <br />
              </Col>
              <Col xs={24} md={12}>
                <Card title="持仓详情" bordered={false} style={{ height: '232px' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
                <br />
              </Col>
              <Col xs={24} md={12}>

                <Card title="下单详情" bordered={false} style={{ height: '232px' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="交易设置" key="nodeList">
          {content}
        </TabPane>
        <TabPane tab="交易统计" key="service" />
      </Tabs>
    </div>
  </div>);
};

Detail.propTypes = {
  tradeDetail: PropTypes.object,
};

export default connect(({ tradeDetail, loading }) => ({ tradeDetail, loading: loading.models.tradeDetail }))(Detail);
