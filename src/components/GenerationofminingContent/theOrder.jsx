import React, {PropTypes, Component} from 'react';
import { Form , Row , Col , Input , DatePicker ,Select } from 'antd';
import formatdata from 'formatdata';

const FormItem = Form.Item;
const Option = Select.Option;

class TheOrder extends Component {

    onSelect({value, option , name}) {
        const dataname = option && option.props && option.props.children && option.props.children[1] || value;
        let payload = {};
        payload[name] = dataname;

        if(name == 'money_code_name') {
            payload['search_code'] = value;
            this.props.setrate(payload);
            return;
        }

        this.props.updatedata(payload);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 13 },
        };

        const money = formatdata({//货币代码
            type:'select',
            data:{
                placeholder:'请选择货币代码',
                datasource:this.props.money_code
            }
        });

        const datelimit = formatdata({//融资期限
            type:'select',
            data:{
                placeholder:'请选择融资期限',
                datasource:this.props.end_days
            }
        });

        const payforrules = formatdata({//付款条约
            type:'select',
            data:{
                placeholder:'请选择付款条款',
                datasource:this.props.purchase_payment_term
            }
        });

        let dateBoot;
        let moneyCode;
        if(this.props.order_type == 1) {
            dateBoot = (
                <FormItem {...formItemLayout} label='预计装船日期'>
                    {getFieldDecorator('receive_goods_time',{
                        rules: [{ required: false, message: '请完善！' }],
                    })(
                        <DatePicker disabled style={{'width':'100%'}} format="YYYY-MM-DD" />
                    )}
                </FormItem>
            );

            moneyCode = (
                <FormItem {...formItemLayout} label='货币代码'>
                    {getFieldDecorator('money_code',{
                        rules: [{ required: true, message: '请完善！' }],
                        initialValue:'CNY'
                    })(
                        <Select style={{width:"80px"}} placeholder="货币" disabled>
                            <Option value="CNY" key>人民币</Option>
                        </Select>
                    )}
                </FormItem>
            )

        }   else if(this.props.order_type == 2) {

            dateBoot = (
                <FormItem {...formItemLayout} label='预计装船日期'>
                    {getFieldDecorator('receive_goods_time',{
                        rules: [{ required: true, message: '请完善！' }],
                    })(
                        <DatePicker style={{'width':'100%'}} format="YYYY-MM-DD" />
                    )}
                </FormItem>
            )

            moneyCode = (
                <div className="select-wrap-in">
                    <FormItem {...formItemLayout} label='货币代码'>
                        {getFieldDecorator('money_code',{
                            rules: [{ required: true, message: '请完善！' }],
                        })(

                            <Select style={{width:"80px"}} placeholder="货币" onSelect={(value, option)=>this.onSelect({value, option ,name:'money_code_name'})}>
                                {money}
                            </Select>

                        )}
                    </FormItem>
                    <div className="abs-select">汇率：{this.props.selectRate || '待选择'}</div>
                </div>
            )
        }

        return (
            <div className="TheOrder">
                <div className="header-message">
                    订单信息
                </div>
                <div className="formWrapP">
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='购销合同编号'>
                                {getFieldDecorator('contract_no',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Input placeholder="请填写购销合同编号" disabled />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='融资订单编号'>
                                {getFieldDecorator('refinance_order_no',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Input placeholder="请填写融资订单编号" disabled/>
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            {dateBoot}
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            {moneyCode}
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='采购单号(PI号)'>
                                {getFieldDecorator('pi_no',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Input placeholder="请填写采购单号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='融资期限'>
                                {getFieldDecorator('end_days',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Select placeholder="请选择融资期限" onSelect={(value, option)=>this.onSelect({value, option ,name:'end_days_name'})}>
                                        {datelimit}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='生产厂商'>
                                {getFieldDecorator('manufacturer',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Input placeholder="请填写生产厂商" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='采购单号(PI号)付款条款'>
                                {getFieldDecorator('purchase_payment_term_id',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Select placeholder="请输入付款条款" onSelect={(value, option)=>this.onSelect({value, option ,name:'purchase_payment_term_id_name'})}>
                                        {payforrules}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


TheOrder.propTypes = {};

export default TheOrder;