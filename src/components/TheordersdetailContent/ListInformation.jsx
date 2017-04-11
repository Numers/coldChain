import React, {PropTypes, Component} from 'react';
import { Row , Col } from 'antd';
import formatdata from 'formatdata';
class Finance extends Component {

    render() {
        const finance_head_info = this.props.finance_head_info || {};
        let list1 = [
            {
                name:'购销合同编号',
                key:'contract_no'
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
                name:'采购订单号(PI号)',
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
                name:'采购单号(PI号)付款条款',
                key:'purchase_payment_term'
            }
        ];

        let list2 = [
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
            },
            {
                name:'报价模式',
                key:'offer_type'
            }
        ];



        //如果为外贸 则加上贸易代理和装船时间
        if(this.props.order_type == 2) {

            list2.push({
                name:'贸易代理',
                key:'agent'
            });

            list1.push({
                name:'预计装船日期',
                key:'receive_goods_time'
            });

        }

        let renderData;
        let renderSp;
        let listTitle;
        if(this.props.showData == '1') {

            listTitle = '订单信息';

            renderData = list1.map((data) => {
                return (
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Row>
                            <Col span={9}>
                                <div className="list-left">{data.name}:</div>
                            </Col>
                            <Col span={15}>
                                <div className="list-right">{finance_head_info && finance_head_info[data.key]}</div>
                            </Col>
                        </Row>
                    </Col>
                )
            });
        } else if(this.props.showData == '2') {

            listTitle = '融资及贸易信息';

            renderData = list2.map((data) => {
                return (
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Row>
                            <Col span={9}>
                                <div className="list-left">{data.name}:</div>
                            </Col>
                            <Col span={15}>
                                <div className="list-right">{finance_head_info && finance_head_info[data.key]}</div>
                            </Col>
                        </Row>
                    </Col>
                )
            });
        } else if(this.props.showData == '3') {
            listTitle = '采购信息汇总';
            if(this.props.order_type == 1) {
                //内贸
                let goods_total_price = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'goods_total_price',
                        money:'',
                        money_code:'money_code'
                    }

                });

                let poundage_cn = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'poundage_cn',
                        money:'',
                        money_code:'money_code'
                    }

                });

                let bond_collected = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'bond_collected',
                        money:'',
                        money_code:'money_code'
                    }

                });

                let nei_actual_retainage_money = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'nei_actual_retainage_money',
                        money:'',
                        money_code:'money_code'
                    }

                });

                let nei_actual_advance_money = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'nei_actual_advance_money',
                        money:'',
                        money_code:'money_code'
                    }

                });

                let listneimao = [
                    {
                        name:'合同总金额',
                        render:goods_total_price,
                    },
                    {
                        name:'GLP收手续费',
                        render:poundage_cn
                    },
                    {
                        name:'GLP收保证金',
                        render:bond_collected
                    },
                    {
                        name:'GLP收手续费日期',
                        dataIndex:"payment_poundage_time"
                    },
                    {
                        name:'GLP收保证金日期',
                        dataIndex:"payment_bond_time"
                    },
                    {
                        name:'GLP支付尾款金额',
                        render:nei_actual_retainage_money
                    },
                    {
                        name:'GLP支付预付款金额',
                        render:nei_actual_advance_money
                    },
                    {
                        name:'GLP支付尾款金额日期',
                        dataIndex:"nei_retainage_payment_time"
                    },
                    {
                        name:'GLP支付预付款日期',
                        dataIndex:"nei_advance_payment_time"
                    }
                ];

                renderData = listneimao.map((data) => {
                    return (
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Row>
                                <Col span={9}>
                                    <div className="list-left">{data.name}:</div>
                                </Col>
                                <Col span={15}>
                                    <div className="list-right">{data.dataIndex?finance_head_info && finance_head_info[data && data.dataIndex || ''] || '/':data.render}</div>
                                </Col>
                            </Row>
                        </Col>
                    )
                });

            } else if(this.props.order_type == 2) {
                //外贸
                let goods_total_price_cn = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'goods_total_price_cn',
                        money:'goods_total_price',
                        money_code:'money_code'
                    }
                });

                let tariff = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'tariff',
                        money:'',
                        money_code:'money_code'
                    }
                });

                let bond_collected = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'',
                        money:'bond_collected',
                        money_code:'money_code'
                    }
                });

                let import_vat = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'import_vat',
                        money:'',
                        money_code:'money_code'
                    }
                });

                let actual_advance_money = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'actual_advance_money',
                        money:'actual_advance_money_wai',
                        money_code:'money_code'
                    }
                });


                let poundage_cn = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'poundage_cn',
                        money:'',
                        money_code:'money_code'
                    }
                });

                let tariff_poundage = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'tariff_poundage',
                        money:'',
                        money_code:'money_code'
                    }
                });

                let goods_total_price_ci_cn;
                if(this.props.statusForTrade>=8) {
                    goods_total_price_ci_cn = formatdata({
                        type:'moneyformat',
                        data:{
                            datasource:finance_head_info,
                            money_cn:'goods_total_price_ci_cn',
                            money:'goods_total_price_ci',
                            money_code:'money_code'
                        }
                    });
                }else {
                    goods_total_price_ci_cn = '/';
                }


                let actual_retainage_money_stage = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'actual_retainage_money',
                        money:'actual_retainage_money_wai',
                        money_code:'money_code'
                    }
                });

                let listwaimao = [
                    {
                        name:'合同总金额(PI)',
                        render:goods_total_price_cn,
                    },
                    {
                        name:'关税',
                        render:tariff
                    },
                    {
                        name:'GLP收保证金',
                        render:bond_collected
                    },
                    {
                        name:'进口增值税',
                        render:import_vat
                    },
                    {
                        name:'GLP收保证金日期',
                        dataIndex:"payment_bond_time"
                    },
                    {
                        name:'支付关税/进口增值税日期',
                        dataIndex:"tax_paytime"
                    },
                    {
                        name:'GLP支付预付款购汇',
                        render:actual_advance_money
                    },
                    {
                        name:'尾款手续费',
                        render:poundage_cn
                    },
                    {
                        name:'GLP支付预付款购汇日期',
                        dataIndex:"wai_advance_payment_time"
                    },
                    {
                        name:'关税/进口增值税手续费',
                        render:tariff_poundage
                    },

                    {
                        name:'合同总金额(CI)',
                        render:goods_total_price_ci_cn
                    },
                    {
                        name:'GLP尾款购汇',
                        render:actual_retainage_money_stage
                    },
                    {
                        name:'GLP支付尾款购汇日期',
                        dataIndex:"wai_retainage_payment_time"
                    }
                ];

                renderData = listwaimao.map((data) => {
                    return (
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Row>
                                <Col span={9}>
                                    <div className="list-left">{data.name}:</div>
                                </Col>
                                <Col span={15}>
                                    <div className="list-right">{data.dataIndex?finance_head_info && finance_head_info[data && data.dataIndex || ''] || '/':data.render}</div>
                                </Col>
                            </Row>
                        </Col>
                    )
                });
            }
        }else if(this.props.showData == '4') {
            listTitle = '融资信息汇总';
            if(this.props.order_type == 1) {
                //内贸

                const actual_advance_money_stage = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'actual_advance_money_stage',
                        money:'',
                        money_code:'money_code'
                    }
                });

                const actual_retainage_money_stage = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'actual_retainage_money_stage',
                        money:'',
                        money_code:'money_code'
                    }
                });

                let listneimao = [
                    {
                        name:'预付款金额（采购前）',
                        render:actual_advance_money_stage
                    },
                    {
                        name:'日期',
                        dataIndex:'nei_advance_payment_time'
                    },
                    {
                        name:'尾款金额（采购中）',
                        render:actual_retainage_money_stage
                    },
                    {
                        name:'日期',
                        dataIndex:'nei_retainage_payment_time'
                    }
                ];

                renderData = listneimao.map((data) => {
                    return (
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Row>
                                <Col span={9}>
                                    <div className="list-left">{data.name}:</div>
                                </Col>
                                <Col span={15}>
                                    <div className="list-right">
                                        {data && data.dataIndex?finance_head_info && finance_head_info[data && data.dataIndex || ''] || '/':data.render}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    )
                });

            } else if(this.props.order_type == 2) {
                //外贸

                const actual_advance_money_stage = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'',
                        money:'actual_advance_money_stage',
                        money_code:'money_code'
                    }
                });

                const actual_retainage_money_stage = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'',
                        money:'actual_retainage_money_stage',
                        money_code:'money_code'
                    }
                });

                const tariff_import_vat = formatdata({
                    type:'moneyformat',
                    data:{
                        datasource:finance_head_info,
                        money_cn:'tariff_import_vat',
                        money:'',
                        money_code:'money_code'
                    }
                });

                let listneimao = [
                    {
                        name:'预付款金额（装船前）',
                        render:actual_advance_money_stage
                    },
                    {
                        name:'日期',
                        dataIndex:'wai_advance_payment_time'
                    },
                    {
                        name:'尾款金额（在途，到港前）',
                        render:actual_retainage_money_stage
                    },
                    {
                        name:'日期',
                        dataIndex:'wai_retainage_payment_time'
                    },
                    {
                        name:'关税/增值税金额（报关,海关放行前）',
                        render:tariff_import_vat
                    },
                    {
                        name:'日期',
                        dataIndex:'tax_paytime'
                    }
                ];

                renderData = listneimao.map((data) => {
                    return (
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Row>
                                <Col span={9}>
                                    <div className="list-left">{data.name}:</div>
                                </Col>
                                <Col span={15}>
                                    <div className="list-right">
                                        {data && data.dataIndex ? finance_head_info && finance_head_info[data && data.dataIndex || ''] || '/': data.render}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    )
                });
            }
        }

        return (
            <div className="listpart">
                <div className="header-message">
                    {listTitle}
                </div>
                <div className="formWrapP">
                    <Row gutter={10}>
                        {renderData}
                    </Row>
                </div>
            </div>
        )
    }
}


Finance.propTypes = {};

export default Finance;