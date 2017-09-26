/**
 * Created by liukun on 16/5/19.
 * 专用于图表控件
 */
import React, { Component, PropTypes } from 'react'
import { Progress } from 'antd';

/**
 * 采用圆圈来标识一个资源使用的百分比，暂时没有想到更好的名字
 */
export default class ResourceUsePercent extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {percent} = this.props;
        let status = 'success';
        if( percent) {

            if (percent > 40 && percent <= 70) {
                status = 'active';
            } else if (percent > 70) {
                status = 'exception';
            }
        }else{
            status = 'exception';
        }
        return(
            <Progress type="circle" percent={percent} width={25} status={status}
                      format={percent => percent}
            />
        )
    }
}