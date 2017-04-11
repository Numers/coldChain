import React, {PropTypes, Component} from 'react';
import './style.css';
import { Row , Col , Breadcrumb} from 'antd';
import { Link } from 'dva/router';
import Status from './Status';
import Tabs from './tabs';

// import LookFor from './LookFor';
// import TableArea from './TableArea';


export default class TradeAgentContent extends Component {

    render() {
        return (
            <div className="TradeAgentDetailContent_shjak22">
                <Row>
                    <Col xs={{span:'18',offset:'3'}} sm={{span:'18',offset:'3'}} md={{span:'18',offset:'3'}} lg={{span:'20',offset:'2'}} >
                        <div className="BreadcrumbWrap">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to="/coldChain/tradeAgent">采购单列表</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>采购单详情</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <Status {...this.props} />

                        <Tabs {...this.props} />

                    </Col>
                </Row>
            </div>
        )
    }
}

TradeAgentContent.propTypes = {};
