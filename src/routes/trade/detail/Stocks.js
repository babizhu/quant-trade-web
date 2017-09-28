import React from 'react';
import { Table } from 'antd';

/**
 * 持仓股票
 */
const Stocks = ({ tradeDetail }) => {
  // Highcharts.setOptions({ global: { useUTC: false } });
  // const { config } = this.props;
  const dataSource = [
    {
    key: '5',
      code:'600010',
    name: '中国铁建',
    age: 42,
    address: '24.9'
  }, {
    key: '6',
      code:'600740',
      name: '物产中大',
    age: 4200,
    address: '19.43'
  }, {
    key: '7',
      code:'600123',

      name: '中国重工',
    age: 10000,
    address: '6.12'
  }];

  const columns = [{
    title: '代码',
    width:100,
    dataIndex: 'code',
    key: 'code',
  },{
    title: '名称',
    width:120,

    dataIndex: 'name',
    key: 'name',
  }, {
    title: '数量(股)',
    dataIndex: 'age',
    width:100,

    key: 'age',
  }, {
    title: '现价',
    dataIndex: 'address',
    width:100,
    key: 'address',
  }];
return(
  <Table dataSource={dataSource} columns={columns} scroll={{ y: 203 }} size='middle'   pagination={false}/>
);
};


export default Stocks;
