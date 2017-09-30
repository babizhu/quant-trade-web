import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Col, Row, Button, Tabs, Card, Icon } from 'antd';
import classnames from 'classnames';
import Label from '../../../components/Utils/Label';
import StockReturnsChart from './StockReturnsChart';
import TradeRecord from './TradeRecord';
import Logs from './logs'
import Stocks from './Stocks';
import styles from './index.less';

const TabPane = Tabs.TabPane;
const Detail = ({ dispatch, tradeDetail }) => {
  const { data } = tradeDetail;
  const startTrade = () => {
    dispatch({
      type: 'tradeDetail/start',
      payload: {
        _id: data._id,
      },
    });
    //   alert(data._id);
  };
  const content = [];
  for (const key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(<div key={key} className={styles.item}>
        <div>{key}</div>
        <div>{String(data[key])}</div>
      </div>);
    }
  }
  const buildHead = () => {
    let label = <Label text={'运行中'} isSuccess />;
    if (!data.status || data.status === 0 || data.status === 2) { // 交易处于停止状态,或者暂停状态
      label = <Label text={'未运行'} isSuccess={false} />;
    }
    return (
      <div>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td><span className={styles.name}>{data.name}</span>
                <span className={styles.label}>{label}</span></td>
              <td style={{ float: 'right' }}>
                {buildActionButton()}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ lineHeight: '25px' }}>
          <div className="desc">{data.desc}</div>
        </div>
      </div>
    );
  };
  const buildActionButton = () => {
    if (!data.status || data.status === 0 || data.status === 2) { // 交易处于停止状态,或者暂停状态
      return (<Button type="ghost" icon="right" className={styles.actionButton} onClick={startTrade}>开始交易</Button>);
    } else { // 交易处于运行状态
      return (<span><Button type="ghost" icon="reload" className={styles.actionButton}>暂停交易</Button>
        <Button type="ghost" icon="right" className={styles.actionButton}>关闭交易</Button></span>
      );
    }
  };
  const buildBalanceStatus = () => {
    return (
      <Row type="flex" justify="space-between" className={styles.databar}>
        <Col xs={8} md={4} style={{ borderRight: '1px solid #e0dede' }}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}><Icon type="pay-circle-o" /> 累计收益</div>
          </div>
        </Col>
        <Col xs={8} md={4} style={{ borderRight: '1px solid #e0dede' }}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>87.39%</div>
            <div className={styles.dataLabel}><Icon type="red-envelope" /> 年化收益</div>
          </div>
        </Col>
        <Col xs={8} md={4} style={{ borderRight: '1px solid #e0dede' }}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>¥ 0.00</div>
            <div className={styles.dataLabel}><Icon type="credit-card" /> 可用资金</div>
          </div>
        </Col>
        <Col xs={8} md={4} style={{ borderRight: '1px solid #e0dede' }}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>45.92%</div>
            <div className={styles.dataLabel}><Icon type="folder" /> 总体仓位</div>
          </div>
        </Col>
        <Col xs={8} md={4} style={{ borderRight: '1px solid #e0dede' }}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>¥170002</div>
            <div className={styles.dataLabel}><Icon type="wallet" /> 总资产</div>
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className={classnames(styles.item)} title="交易时段实时更新">
            <div className={classnames(styles.dataValue, styles.moneyRed)}>17.99%</div>
            <div className={styles.dataLabel}><Icon type="down-circle-o" /> 最大回撤</div>
          </div>
        </Col>

      </Row>
    );
  };
  return (<div className={styles.content}>
    <div className={styles.head}>

      {buildHead()}
    </div>

    {buildBalanceStatus()}

    <div className={styles.pannel}>
      <Tabs tabPosition="top">
        <TabPane tab="交易总览" key="dashboard">
          <div style={{ background: '#ECECEC', padding: '6px' }}>
            <Row gutter={10}>
              <Col xs={24} md={12}>
                <Card title={<span><Icon type="dot-chart" /> 历史收益</span>} bordered={false} style={{ height: '623px' }}>
                  <StockReturnsChart />
                </Card>
                <div style={{ height: '3px' }} />

              </Col>
              <Col xs={24} md={12} >
                <Card title={<span><Icon type="pay-circle-o" /> 交易记录</span>} bordered={false} bodyStyle={{ padding: '6px' }}>

                  <TradeRecord />
                </Card>
                <div style={{ height: '3px' }} />

              </Col>

              <Col xs={24} md={12} >
                <Card title={<span><Icon type="folder" /> 股票持仓</span>} bordered={false} bodyStyle={{ padding: '6px', minHeight: '263px' }}>

                  <Stocks />
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="交易设置" key="nodeList">
          {content}
        </TabPane>
        <TabPane tab="交易统计" key="service" />
          <TabPane tab="运行日志" key="logs" ><Logs /></TabPane>
      </Tabs>
    </div>
  </div>);
};

Detail.propTypes = {
  tradeDetail: PropTypes.object,
};

export default connect(({ tradeDetail, loading }) => ({ tradeDetail, loading: loading.models.tradeDetail }))(Detail);
