import React from 'react';
import { Table } from 'antd';

/**
 * 交易记录
 */
const TradeRecord = ({ tradeDetail }) => {
  const dataSource = [
    {
      key: '51',
      code:'600010',
      name: '中国铁建',
      age: 42,
      time:'2017-03-02 11:28:00',
      address: '24.9'
    },{
      key: '52',
      code:'600010',
      name: '中国铁建',
      time:'2017-03-02 11:28:00',

      age: 42,
      address: '24.9'
    },{
      key: '5',
      code:'600010',
      name: '中国铁建',
      time:'2017-03-02 11:28:00',

      age: 42,
      address: '24.9'
    }, {
      key: '6',
      code:'600740',
      name: '物产中大',
      time:'2017-03-02 11:28:00',

      age: 4200,
      address: '19.43'
    }, {
      key: '7',
      code:'600123',
      time:'2017-03-02 11:28:00',
      name: '中国重工',
      age: 10000,
      address: '6.12'
    }];

  const columns = [{
    title: '代码',
    width:80,
    dataIndex: 'code',
    key: 'code',
  },{
    title: '名称',

    width:100,

    dataIndex: 'name',
    key: 'name',
  }, {
    title: '数量(股)',
    dataIndex: 'age',
    width:80,


    key: 'age',
  }, {
    width:80,

    title: '交易价格',
    dataIndex: 'address',

    key: 'address',
  }, {
    title: '交易时间',
    dataIndex: 'time',
    width:150,
    key: 'time',
  }];
  return(
    <Table dataSource={dataSource} columns={columns} scroll={{ y: 203 }} size='middle'   pagination={false}/>
  );
};



export default TradeRecord;
