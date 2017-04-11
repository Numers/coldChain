import React, {PropTypes, Component} from 'react';

import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';

export default class mianbaoNavTop extends Component {

    render() {
        return (
            <div className="mianbaotopNav">
                <div className="mianbaotopNavWrap">
                    <Breadcrumb>
                        <Breadcrumb.Item>您的位置</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/coldChain/pickcenter">提货中心</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>提货明细</Breadcrumb.Item>
                    </Breadcrumb>
                    {/*<div className="goback">*/}
                        {/*<Link to="/coldChain/pickcenter">返回</Link>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}

mianbaoNavTop.propTypes = {};
