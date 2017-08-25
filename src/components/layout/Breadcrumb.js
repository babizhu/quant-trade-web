/**
 * Created by liu_k on 2016/4/12.
 * 内容页面上部的导航条
 */

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd';


export default class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }


    linkRender(href, name, separator) {

        return (
            <span key={name} className='breadcrumb'>
                <Link to={href}>
                    <span className="name">{name}</span>
                </Link>
                <span className='separator'>{separator}</span>
            </span>
        );
        //return <span><a href={`${href}`}>{name}</a> {separator}</span> ;
    }

    nameRender(name) {
        return <span className='nameOnly' key={name}> {name}</span>;
    }

    render() {
        const { separator,routes,params } = this.props;
        let crumbs;
        if (routes && routes.length > 0) {
            const paths = [];
            crumbs = routes.map((route, i) => {
                route.path = route.path || '';
                let path = route.path.replace(/^\//, '');
                Object.keys(params).forEach(key => {
                    path = path.replace(`:${key}`, params[key]);
                });
                if (path) {
                    paths.push(path);
                }

                if (!route.breadcrumbName) {
                    return null;
                }
                const name = route.breadcrumbName.replace(/\:(.*)/g, (replacement, key) => {
                    return params[key] || replacement;
                });

                let link;
                if (i === routes.length - 1) {
                    link = this.nameRender(name);

                    //console.log( name )
                } else {
                    link = this.linkRender(`/${paths.join('/')}`, name, separator);

                }
                return link;
            });
        }
        return (
            <span><Icon type='home' style={{fontSize:'10px'}}/> {crumbs}</span>
        )
    }
}
