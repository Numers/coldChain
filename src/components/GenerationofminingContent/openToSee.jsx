import React, {PropTypes, Component} from 'react';
import { Form , Button , Row , Col , Table } from 'antd';
import formatdata from 'formatdata';
class OpenToSee extends Component {
    download(submitData) {

        const newSubmitdata = Object.assign({},submitData);
        newSubmitdata.order_type = this.props.order_type;
        newSubmitdata.order_type_name = this.props.order_type == 1?'内贸':'外贸';

        newSubmitdata.from_addr_id_name = this.props.from_addr_id_name;
        newSubmitdata.to_addr_id_name = this.props.to_addr_id_name;
        newSubmitdata.offer_type_id_name = this.props.offer_type_id_name;
        newSubmitdata.agent_id_name = this.props.agent_id_name;
        newSubmitdata.depot_id_name = this.props.depot_id_name;
        newSubmitdata.purchase_payment_term_id_name = this.props.purchase_payment_term_id_name;

        const stringifynewSubmitdata = JSON.stringify(newSubmitdata);
        window.open(`/api/file/excelexport?data=${stringifynewSubmitdata}`);

    }

    submit(payload) {

        let submitData = payload && payload.submitData && Object.assign({},payload.submitData);

        if(this.props.from == 'draftbox' && this.props.id) {
            submitData.refinance_apply_id = this.props.id
        }

        this.props.submit({
            submitData:submitData
        });

    }

    render() {

        let columns;
        let scroll;
        if(this.props.order_type == 1) {
            scroll = {
                x:900
            }

            columns = [{
                title: '商品名称（中文）',
                width: 150,
                dataIndex:'goods_name_cn',
                key: 'goods_name_cn',
                fixed: 'left'
            },{
                title: '规格',
                dataIndex:'specification',
                key: 'specification'
            },{
                title: '销项税率',
                dataIndex:'tax_point',
                key: 'tax_point',
                render:(data) => {
                    return (
                        <span>{data+'%'}</span>
                    )
                }
            },{
                title: '计量单位',
                dataIndex:'unit_name',//unit_name
                key: 'unit_name'//unit_name
            }, {
                title: '计价数量',
                dataIndex:'num_pi',
                key: 'num_pi',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '箱数',
                dataIndex:'box_num',
                key: 'box_num',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '单价',
                dataIndex:'price_pi',
                key: 'price_pi',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '合同成交价（含税）',
                dataIndex:'goods_total_price_pi',
                key: 'goods_total_price',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }];
        } else if(this.props.order_type == 2) {
            scroll = {
                x:900
            }

            columns = [{
                title: '商品名称（中文）',
                width: 150,
                dataIndex:'goods_name_cn',
                key: 'goods_name_cn',
                fixed: 'left',
            },{
                title: '商品名称（英文）',
                dataIndex:'goods_name_en',
                key: 'goods_name_en',
            },{
                title: '规格',
                dataIndex:'specification',
                key: 'specification'
            },{
                title: '厂号',
                dataIndex:'factory_no',
                key: 'factory_no'
            },{
                title: '销项税率',
                dataIndex:'tax_point',
                key: 'tax_point',
                render:(data) => {
                    return (
                        <span>{data+'%'}</span>
                    )
                }
            },{
                title: '计量单位',
                dataIndex:'unit_name',//unit_name
                key: 'unit_name'//unit_name
            }, {
                title: '计价数量',
                dataIndex:'num_pi',
                key: 'num_pi',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '箱数',
                dataIndex:'box_num',
                key: 'box_num',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '单价',
                dataIndex:'price_pi',
                key: 'price_pi',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '合同成交价（不含税）',
                dataIndex:'goods_total_price_pi',
                key: 'goods_total_price',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }];
        }


        const formdatain = this.props.formdatain || {};

        const submitData = Object.assign({},formdatain);

        //贸易类型
        submitData.order_type = this.props.order_type;
        submitData.file_type = 1;

        //形式发票
        submitData.file_info = formatdata({
            type:'imgformat',
            data:this.props.upload
        });

        //融资金额
        submitData.goods_total_price = this.props.goods_total_price;
        submitData.goods_total_price_cn = this.props.goods_total_price_cn;

        submitData.refinance_total_price = this.props.refinance_total_price;
        submitData.refinance_total_price_cn = this.props.refinance_total_price_cn;

        submitData.poundage = this.props.poundage;
        submitData.poundage_cn = this.props.poundage_cn;

        submitData.bond = this.props.bond;
        submitData.bond_cn = this.props.bond_cn;

        submitData.is_draft = 2;
        submitData.refinance_apply_id = this.props.refinance_apply_id;

        const data = formdatain && formdatain.goods_info || [];

        const visible = this.props.visible;
        let style = {};

        if(visible) {
            style = {display:'block'}
        } else {
            style = {display:'none'}
        }


        let goods_total_price;
        let bond;
        let poundage;
        let refinance_total_price;

        if(this.props.order_type == 1) {
            //内贸
            goods_total_price = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'goods_total_price',
                    money:'',
                    money_code:''
                }
            });

            bond = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'bond',
                    money:'',
                    money_code:''
                }
            });

            poundage = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'poundage',
                    money:'',
                    money_code:''
                }
            });

            refinance_total_price = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'refinance_total_price',
                    money:'',
                    money_code:''
                }
            });

        } else if(this.props.order_type == 2) {
            //外贸
            goods_total_price = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'goods_total_price_cn',
                    money:'goods_total_price',
                    money_code:'moneycode'
                }
            });

            bond = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'bond_cn',
                    money:'bond',
                    money_code:'moneycode'
                }
            });

            poundage = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'poundage_cn',
                    money:'poundage',
                    money_code:'moneycode'
                }
            });

            refinance_total_price = formatdata({
                type:'moneyformat',
                data:{
                    datasource:this.props,
                    money_cn:'refinance_total_price_cn',
                    money:'refinance_total_price',
                    money_code:'moneycode'
                }
            });
        }

        return (
            <div className="OpenToSee" style={style}>
                <div className="OpenToSeeWrap">
                    <div className="title-wrap">
                        融资订单
                        <div className="abs-title" onClick={()=>this.download(submitData)}>
                            下载打印
                        </div>
                    </div>
                    <div className="body-table">
                        <div className="ddandrz">

                            <Row>
                                <Col span={12}>
                                    <div className="b-t">订单信息</div>
                                </Col>
                                <Col span={12}>
                                    <div className="b-t">融资及贸易信息</div>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={6}>
                                    <div className="b-b">购销合同编号</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{formdatain.contract_no}</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">起运地</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{this.props.from_addr_id_name}</div>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={6}>
                                    <div className="b-b">融资订单号</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{formdatain.refinance_order_no}</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">目的地</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{this.props.to_addr_id_name}</div>
                                </Col>
                            </Row>
                            {this.props.order_type==1?(
                                <Row>
                                    <Col span={6}>
                                        <div className="b-b">采购订单号（PI号）</div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b">{formdatain.pi_no}</div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b"></div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b"></div>
                                    </Col>
                                </Row>
                                ):(<Row>
                                    <Col span={6}>
                                        <div className="b-b">采购订单号（PI号）</div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b">{formdatain.pi_no}</div>
                                    </Col>

                                    <Col span={6}>
                                        <div className="b-b">贸易代理</div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b">{this.props.agent_id_name}</div>
                                    </Col>

                                </Row>)}

                            <Row>
                                <Col span={6}>
                                    <div className="b-b">生产厂商</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{formdatain.manufacturer}</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">仓库</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{this.props.depot_id_name}</div>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={6}>
                                    <div className="b-b">采购订单号（PI号）付款条款</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{this.props.purchase_payment_term_id_name}</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">报价模式</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{this.props.offer_type_id_name}</div>
                                </Col>
                            </Row>

                            {this.props.order_type==1?"":(<Row>
                                    <Col span={6}>
                                        <div className="b-b">预计装船日期</div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b">{formdatain.receive_goods_time}</div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b"></div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b"></div>
                                    </Col>
                                </Row>)}

                            {this.props.order_type==1?"":(<Row>

                                    <Col span={6}>
                                        <div className="b-b">货币代码</div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b">{this.props.money_code_name}</div>
                                    </Col>

                                    <Col span={6}>
                                        <div className="b-b"></div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="b-b"></div>
                                    </Col>
                                </Row>)}
                            <Row>
                                <Col span={6}>
                                    <div className="b-b">融资期限</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b">{this.props.end_days_name}</div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b"></div>
                                </Col>
                                <Col span={6}>
                                    <div className="b-b"></div>
                                </Col>
                            </Row>

                        </div>
                        <div className="shanp">
                            <Table columns={columns} pagination={false} dataSource={data} scroll={scroll} />
                        </div>
                        <div className="rzall">
                            <div className="rzall-t">合计</div>

                            <Row>
                                <Col span={4}>
                                    <div className="rzall-b">货值总金额：</div>
                                </Col>
                                <Col span={8}>
                                    <div className="rzall-b2">{this.props.goods_total_price?goods_total_price:'待计算'}</div>
                                </Col>
                                <Col span={4}>
                                    <div className="rzall-b">融资总金额：</div>
                                </Col>
                                <Col span={8}>
                                    <div className="rzall-b2">{this.props.refinance_total_price?refinance_total_price:'待计算'}</div>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={4}>
                                    <div className="rzall-b">手续费：</div>
                                </Col>
                                <Col span={8}>
                                    <div className="rzall-b2">{this.props.poundage?poundage:'待计算'}</div>
                                </Col>
                                <Col span={4}>
                                    <div className="rzall-b">保证金：</div>
                                </Col>
                                <Col span={8}>
                                    <div className="rzall-b2">{this.props.bond?bond:'待计算'}</div>
                                </Col>
                            </Row>

                        </div>
                    </div>
                    <div className="bottom-btn">
                        <div className="qx" onClick={()=>this.props.openToSeeFloat({visible:false})}>取消</div>
                        <div className="tj" onClick={()=>this.submit({
                            submitData:submitData
                        })}>提交</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OpenToSee;