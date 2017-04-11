import React, {PropTypes, Component} from 'react';
import { Row , Col } from 'antd';
import formatdata from 'formatdata';
class Finance extends Component {

    render() {
        const list1 = [
            {
                name:'预计装船日期',
                key:'receive_goods_time'
            },
            {
                name:'融资订单号',
                key:'refinance_order_no'
            },
            {
                name:'货币代码',
                key:'money_code'
            },
            {
                name:'采购订单号（PI号）',
                key:'pi_no'
            },
            {
                name:'融资期限',
                key:'end_days'
            },
            {
                name:'生产厂商',
                key:'manufacturer'
            },
            {
                name:'采购订单号（PI号）付款条款',
                key:'purchase_payment_term'
            },
        ];

        const list2 = [
            {
                name:'起运地',
                key:'faddress'
            },
            {
                name:'仓库',
                key:'depot_name'
            },
            {
                name:'目的地',
                key:'taddress'
            }
        ];

        const list3 = [
            {
                name:'合同总金额',
                key:'goods_total_price',
                price:true
            },
            {
                name:'合同总金额CI',
                key:'goods_total_price_ci',
                price:true
            }
        ];

        const finance_head_info = this.props.finance_head_info || {};
        let renderData;
        let listTitle;
        let renderList;

        if(this.props.showData == '1') {
            listTitle = '订单信息';
            renderData = list1;
        } else if(this.props.showData == '2') {
            listTitle = '融资及贸易信息';
            renderData = list2;
        } else if(this.props.showData == '3') {
            listTitle = '融资金额';
            renderData = list3;
        }


        let renderMoney;
        if(this.props.showData == '3') {
            //内贸

            renderMoney = (data) => {

                if(!data || !data.price) {
                    return finance_head_info[data.key];
                }

                const price1 = formatdata({
                    type:'priceadd',
                    data:finance_head_info[`${data.key}_cn`]
                });

                const price2 = formatdata({
                    type:'priceadd',
                    data:finance_head_info[data.key]
                });

                if(price1 && price1!='/') {
                    if(price2 && price2!='/') {
                        return `￥${price1}(${finance_head_info.money_code} ${price2})`;
                    } else {
                        return `￥${price1}`
                    }
                }else {
                    if(price2 && price2!='/') {
                        return `(${finance_head_info.money_code} ${price2})`;
                    }else {
                        return '/'
                    }
                }



            }
        } else {

            renderMoney = (data) => {

                if(!data || !data.price) {
                    return finance_head_info[data.key];
                }

                const price1 = formatdata({
                    type:'priceadd',
                    data:finance_head_info[data.key]
                });

                if(price1 && price1!='/') {
                    return price1
                }else {
                    return '/'
                }
            }

        }

        renderList = renderData.map((data) => {
            return (
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Row>
                        <Col span={10}>
                            <div className="list-left">{data.name}:</div>
                        </Col>
                        <Col span={14}>
                            <div className="list-right">{renderMoney(data)}</div>
                        </Col>
                    </Row>
                </Col>
            )
        });

        return (
            <div className="listpart">
                <div className="header-message">
                    {listTitle}
                </div>
                <div className="formWrapP">
                    <Row gutter={20}>
                        {renderList}
                    </Row>
                </div>
            </div>
        )
    }
}


Finance.propTypes = {};

export default Finance;