import React from 'react';
// import ReactHighcharts, { Highcharts } from 'react-highcharts';
const ReactHighcharts = require('react-highcharts');
/**
 * 整个集群的cpu图表
 */
const StockReturnsChart = ({ tradeDetail }) => {
  // Highcharts.setOptions({ global: { useUTC: false } });
  // const { config } = this.props;
  const allCfg = { title: {
    text: '历史收益',
    x: -20,
  },
    subtitle: {
      text: '数据来源: 必发财炒股鸡',
      x: -20,
    },
    xAxis: {
      categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    yAxis: {
      title: {
        text: '金额 (元)',
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080',
      }],
    },
    tooltip: {
      valueSuffix: '°C',
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
    },
    credits: {
      enabled: false,
    },
    series: [{
      name: '策略收益',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    }, {
      name: '基准收益',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
    }] };


  return (

    <ReactHighcharts config={allCfg} />
  );
};


export default StockReturnsChart;
