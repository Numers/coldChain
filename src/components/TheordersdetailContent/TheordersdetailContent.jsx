import React, {PropTypes, Component} from 'react';
import './style.css';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router'
import StatusList from './statuslist';
import Tabs from './tabs';

export default class TheordersdetailContent extends Component {

    render() {
        return (
            <div className="TheordersdetailContent_shjak22">

                {/*面包屑*/}
                <div className="bread">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/coldChain/theorders">订单列表</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>订单详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {/*状态*/}
                <StatusList {...this.props} />

                {/*融资信息 附件信息等。。*/}
                <Tabs {...this.props} />

            </div>
        )
    }
}

TheordersdetailContent.propTypes = {};
