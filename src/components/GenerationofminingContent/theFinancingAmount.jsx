import React, {PropTypes, Component} from 'react';
import formatdata from 'formatdata';
import { Form , Row , Col , Select , Button } from 'antd';
const FormItem = Form.Item;

class TheOrder extends Component {

    gotoClu() {
        const form = this.props.form;
        const money_code = form.getFieldValue('money_code');
        const offer_type_id = form.getFieldValue('offer_type_id');
        const purchase_payment_term_id = form.getFieldValue('purchase_payment_term_id');
        const order_type = this.props.order_type;
        const datasource = this.props.datasource;

        console.log(datasource,'datasource');

        const refinance_apply_id = this.props.refinance_apply_id;
        this.props.Tocalculate({
            money_code,
            offer_type_id,
            order_type,
            purchase_payment_term_id,
            datasource,
            refinance_apply_id
        });
    }

    render() {
        let goods_total_price;
        let bond;
        let poundage;
        let refinance_total_price;

        const goods_total_price_format = formatdata({
            type:'priceadd',
            data:this.props.goods_total_price
        });

        const goods_total_price_cn_format = formatdata({
            type:'priceadd',
            data:this.props.goods_total_price_cn
        });

        const bond_format = formatdata({
            type:'priceadd',
            data:this.props.bond
        });

        const bond_cn_format = formatdata({
            type:'priceadd',
            data:this.props.bond_cn
        });

        const poundage_format = formatdata({
            type:'priceadd',
            data:this.props.poundage
        });

        const poundage_cn_format = formatdata({
            type:'priceadd',
            data:this.props.poundage_cn
        });

        const refinance_total_price_format = formatdata({
            type:'priceadd',
            data:this.props.refinance_total_price
        });

        const refinance_total_price_cn_format = formatdata({
            type:'priceadd',
            data:this.props.refinance_total_price_cn
        });

        if(this.props.order_type == 1) {
            //内贸
            goods_total_price = `￥${goods_total_price_format}`;
            bond = `￥${bond_format}`;
            poundage = `￥${poundage_format}`;
            refinance_total_price = `￥${refinance_total_price_format}`;
        } else if(this.props.order_type == 2) {
            //外贸
            goods_total_price = `￥${goods_total_price_cn_format}(${this.props.moneycode}${goods_total_price_format})`;
            bond = `￥${bond_cn_format}(${this.props.moneycode}${bond_format})`;
            poundage = `￥${poundage_cn_format}(${this.props.moneycode}${poundage_format})`;
            refinance_total_price = `￥${refinance_total_price_cn_format}(${this.props.moneycode}${refinance_total_price_format})`;
        }

        return (
            <div className="TheOrder">
                <div className="header-message">
                    融资金额
                    <div className="list-m-qwer">
                        <FormItem>
                            <Button onClick={()=>{this.gotoClu()}}>计算</Button>
                        </FormItem>
                    </div>
                </div>

                <div className="formWrapP formWrapP-LE">
                    <Row gutter={20}>

                        <Col xs={24} sm={12} md={12} lg={12}>
                            <div className="list-m">
                                <Row>
                                    <Col span={10}>
                                        合同总金额:
                                    </Col>
                                    <Col span={14}>
                                        {this.props.goods_total_price?goods_total_price:'待计算'}
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12}>
                            <div className="list-m">
                                <Row>
                                    <Col span={10}>
                                        保证金:
                                    </Col>
                                    <Col span={14}>
                                        {this.props.bond?bond:'待计算'}
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12}>
                            <div className="list-m">
                                <Row>
                                    <Col span={10}>
                                        手续费:
                                    </Col>
                                    <Col span={14}>
                                        {this.props.poundage?poundage:'待计算'}
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12}>
                            <div className="list-m">
                                <Row>
                                    <Col span={10}>
                                        融资总金额:
                                    </Col>
                                    <Col span={14}>
                                        {this.props.refinance_total_price?refinance_total_price:'待计算'}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}


TheOrder.propTypes = {};

export default TheOrder;