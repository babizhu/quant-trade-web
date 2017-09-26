/**
 * Created by liukun on 16/5/19.
 * 专用于图表控件
 */
import React, { Component, PropTypes } from 'react'
import ReactHighcharts,{Highcharts} from 'react-highcharts'

export default class Charts extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //let chart = this.refs.chart.getChart();
        //chart.series[0].addPoint({x: 10, y: 12});
    }
}