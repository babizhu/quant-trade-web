import React from 'react';
import { Table } from 'antd';

/**
 * 交易记录
 */
const TradeRecord = ({ tradeRecords }) => {
  const columns = [{
    title: '代码',
    width: 75,
    dataIndex: 'stockId',
    key: 'stockId',
  }, {
    title: '名称',
    width: 85,
    dataIndex: 'stockId',
    key: 'name',
  }, {
    title: '数量(股)',
    dataIndex: 'share',
    width: 80,
    key: 'share',
  }, {
    width: 80,

    title: '交易价格',
    dataIndex: 'price',
    key: 'price',
    render(value) {
      return Math.floor(value * 100) / 100;
    },
  }, {
    title: '交易时间',
    dataIndex: 'time',
    width: 170,
    key: 'time',
  }];
  return (
    <Table
      dataSource={tradeRecords} columns={columns} rowKey={record => record.id}
      scroll={{ y: 203 }} size="middle" pagination={false}
    />
  );
};


export default TradeRecord;
