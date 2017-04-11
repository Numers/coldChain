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
        this.props.updatedata(payload);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 13 },
        };

        const addrstart = formatdata({//起运地
            type:'select',
            data:{
                placeholder:'请选择起运地',
                datasource:this.props.addr || []
            }
        });

        const addrend = formatdata({//目的地
            type:'select',
            data:{
                placeholder:'请选择目的地',
                datasource:this.props.aim_addr || []
            }
        });

        const depot = formatdata({//仓库
            type:'select',
            data:{
                placeholder:'请选择仓库',
                datasource:this.props.depot || []
            }
        });

        const offer_type = formatdata({//报价模式
            type:'select',
            data:{
                placeholder:'请选择报价模式',
                datasource:this.props.offer_type || []
            }
        });

        const agent = formatdata({//贸易代理
            type:'select',
            data:{
                placeholder:'请选择贸易代理',
                datasource:this.props.agent || []
            }
        });

        const order_type = this.props.order_type;
        let selectreturn ;
        if(order_type == 2) {
            selectreturn = (
                <FormItem {...formItemLayout} label='贸易代理'>
                    {getFieldDecorator('agent_id',{
                        rules: [{ required: true, message: '请完善！' }],
                    })(
                        <Select placeholder="请选择贸易代理" onSelect={(value, option)=>this.onSelect({value, option ,name:'agent_id_name'})}>
                            {agent}
                        </Select>
                    )}
                </FormItem>
            )
        }else if(order_type == 1) {
            selectreturn = (
                <FormItem {...formItemLayout} label='贸易代理'>
                    {getFieldDecorator('agent_id',{
                        rules: [{ required: false, message: '请完善！' }],
                    })(
                        <Select disabled placeholder="请选择贸易代理" onSelect={(value, option)=>this.onSelect({value, option ,name:'agent_id_name'})}>
                            {agent}
                        </Select>
                    )}
                </FormItem>
            )
        }

        return (
            <div className="TheOrder formWrapP-slp">
                <div className="header-message">
                    融资及贸易信息
                </div>
                <div className="formWrapP">
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='起运地'>
                                {getFieldDecorator('from_addr_id',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Select placeholder="请选择起运地" onSelect={(value, option)=>this.onSelect({value, option ,name:'from_addr_id_name'})}>
                                        {addrstart}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='目的地'>
                                {getFieldDecorator('to_addr_id',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Select placeholder="请选择目的地" onSelect={(value, option)=>this.onSelect({value, option ,name:'to_addr_id_name'})}>
                                        {addrend}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='仓库'>
                                {getFieldDecorator('depot_id',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Select placeholder="请选择仓库" onSelect={(value, option)=>this.onSelect({value, option ,name:'depot_id_name'})}>
                                        {depot}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8}>
                            <FormItem {...formItemLayout} label='报价模式'>
                                {getFieldDecorator('offer_type_id',{
                                    rules: [{ required: true, message: '请完善！' }],
                                })(
                                    <Select placeholder="请选择报价模式" onSelect={(value, option)=>this.onSelect({value, option ,name:'offer_type_id_name'})}>
                                        {offer_type}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8}>
                            {selectreturn}
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}


TheOrder.propTypes = {};

export default TheOrder;