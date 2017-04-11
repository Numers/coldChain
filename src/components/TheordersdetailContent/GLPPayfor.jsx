import React, {PropTypes, Component} from 'react';
import formatdata from 'formatdata';
import { Row , Col } from 'antd';
class GLPPayfor extends Component {

    render() {
        const finance_glp_payment_info = this.props.finance_glp_payment_info || [];
        // const payment_flag = formatdata({type:'priceadd',data:data});
        const listM = finance_glp_payment_info.map((data) => {
            return (
                    <div className="payforlist">
                        <div className="payfor-title-glp">
                            {data.payment_type == 1?"GLP支付预付款信息":"GLP支付尾款信息"}
                        </div>
                        <div className="payforbody">
                            <Row>
                                <Col xs={24} sm={12} md={12} lg={6}>
                                    <div className="list-pay">
                                        <span className="list-left">支付状态：</span>
                                        <span className="list-right">{data.payment_flag?data.payment_flag:'/'}</span>
                                    </div>
                                    <div className="list-pay">
                                        <span className="list-left">支付金额：</span>
                                        <span className="list-right">{data.actual_money?formatdata({type:'priceadd',data:data.actual_money}):'/'}</span>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6}>
                                    <div className="list-pay">
                                        <span className="list-left">支付时间：</span>
                                        <span className="list-right">{data.payment_time?data.payment_time:'/'}</span>
                                    </div>
                                    <div className="list-pay">
                                        <span className="list-left">支付交易号：</span>
                                        <span className="list-right">{data.payment_no?data.payment_no:'/'}</span>
                                    </div>
                                </Col>
                            </Row>


                        </div>
                    </div>
            )
        });
        return (
            <div className="glppayfor">
                {listM}
            </div>
        )
    }
}


GLPPayfor.propTypes = {};

export default GLPPayfor;