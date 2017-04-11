import React, {PropTypes, Component} from 'react';
import { Form , Table , Input , Select , Modal } from 'antd';
import formatdata from 'formatdata';
import deleteGoodsimg from 'public/img/deleteGoods.png';
import addGoodsimg from 'public/img/addGoods.png';
import { message } from 'antd';
message.config({
    top: 50,
    duration: 2,
});

const confirm = Modal.confirm;
const FormItem = Form.Item;
const Option = Select.Option;

class TheOrder extends Component {
    onSelect({value, option , name}) {
        const dataname = option && option.props && option.props.children && option.props.children[1] || value;
        let payload = {};
        payload[name] = dataname;
        this.props.updateFooddata(payload);
    }

    deleteGoodsQuery(payload) {
        const self = this;
        confirm({
            title: '确认删除？',
            content: '',
            onOk() {
                self.props.deleteGoods(payload);
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }

    calculateFn(params) {
        const form = this.props.form;
        const stateID = params.stateID;
        const props = this.props;
        setTimeout(function() {
            const num_piData = form.getFieldValue(`num_pi-${stateID}`);
            const goods_total_price_piData = form.getFieldValue(`goods_total_price_pi-${stateID}`);

            if(num_piData && goods_total_price_piData ) {

                const dwe =  goods_total_price_piData/num_piData;
                const price_pisingle = formatdata({
                    type:'getFloat',
                    data:{
                        number:dwe,
                        n:4
                    }
                });

                const field = 'price_pi-'+stateID;
                let queryData = {};

                queryData[field] = formatdata({
                    type:'pricesavetwo',
                    data:(price_pisingle+'')
                });

                form.setFieldsValue(queryData);
                props.sendAllMoney({
                    stateID:stateID,
                    good_total_price:goods_total_price_piData,
                });

            }
        },1);

    }

    downloadexcle() {

        const order_type = this.props.order_type;
        window.open(`/api/refll/goodsExcel?order_type=${order_type}`);

    }

    render() {
        console.log(this.props.datasource);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            wrapperCol: { span: 24 }
        };

        const moneyCode = formatdata({//销项税率
            type:'select',
            data:{
                placeholder:'请选择销项税率',
                datasource:this.props.tax_point
            }
        });

        const unit = formatdata({//计量单位
            type:'select',
            data:{
                placeholder:'请选择计量单位',
                datasource:this.props.unit
            }
        });

        const calculate = (params) => this.calculateFn(params);

        const addGoods = this.props.addGoods;
        const deleteGoods = (payload) => {
            this.deleteGoodsQuery(payload);
        };
        const datasource = this.props.datasource;
        let columns;
        let scroll;
        if(this.props.order_type==1) {
            scroll = {};
            columns = [{
                title: '商品名称（中文）',
                width: 170,
                key: 'goods_name_cn',
                dataIndex:'goods_name_cn',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`goods_name_cn-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Input size="default" style={{width:'150px',marginBottom:'0px'}} />
                        )}
                    </FormItem>)
                }
            },{
                title: '规格',
                key: 'specification',
                dataIndex:'specification',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`specification-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Input size="default" style={{width:'70px',marginBottom:'0px'}} />
                        )}
                    </FormItem>)
                }
            },{
                title: '销项税率',
                key: 'tax_point',
                dataIndex:'tax_point',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`tax_point-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data && data.toString()
                        })(
                            <Select size="default" style={{width:'60px'}} placeholder="请选择销项税率" onSelect={(value, option)=>this.onSelect({value, option ,name:`tax_point_name-${data1.stateID}`})}>
                                {moneyCode}
                            </Select>
                        )}
                    </FormItem>)
                }
            },{
                title: '计量单位',
                key: 'unit',
                dataIndex:'unit',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`unit-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Select size="default" style={{width:'60px'}} placeholder="请选择" onSelect={(value, option)=>this.onSelect({value, option ,name:`unit_name-${data1.stateID}`})}>
                                {unit}
                            </Select>
                        )}
                    </FormItem>)
                }
            } , {
                title: '计价数量',
                key: 'num_pi',
                dataIndex:'num_pi',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`num_pi-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Input size="default" style={{width:'80px',marginBottom:'0px'}} onChange={(e)=>{calculate({e:e,stateID:data1.stateID,slefin:`num_pi`})}} />
                        )}
                    </FormItem>)
                }
            }, {
                title: '箱数',
                key: 'box_num',
                dataIndex:'box_num',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`box_num-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data || ''
                        })(
                            <Input size="default" style={{width:'80px',marginBottom:'0px'}} />
                        )}
                    </FormItem>)
                }
            },{
                title: ' 合同成交价（含税）',
                key: 'good_total_price',
                dataIndex:'good_total_price',
                render:(data,data1) => {
                    return (
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator(`goods_total_price_pi-${data1.stateID}`,{
                                rules: [{ required: true, message: '请完善！' }],
                                initialValue:data || ''
                            })(
                                <Input size="default" style={{width:'110px',marginBottom:'0px'}} onChange={(e)=>{calculate({e:e,stateID:data1.stateID,slefin:`goods_total_price_pi`})}}/>
                            )}
                        </FormItem>
                    )
                }
            }, {
                title: '单价',
                key: 'price_pi',
                dataIndex:'price_pi',
                render:(data,data1) => {
                    return (
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator(`price_pi-${data1.stateID}`,{
                                rules: [{ required: true, message: '请完善！' }],
                                initialValue:data
                            })(
                                <Input size="default" style={{width:'80px',marginBottom:'0px'}} disabled />
                            )}
                        </FormItem>
                    )
                }
            }, {
                title: '操作',
                width: 80,
                key: 'operation',
                fixed: 'right',
                render: (data,index,i) => {
                    if(datasource.length == 1) {
                        return (
                            <div>
                                <img src={addGoodsimg} className="cz-img" onClick={addGoods}/>
                            </div>
                        )
                    }
                    return (
                        <div>
                            <img src={deleteGoodsimg} className="cz-img" onClick={()=>deleteGoods({stateID:data.stateID})}/>
                            <img src={addGoodsimg} className="cz-img" onClick={addGoods}/>
                        </div>
                    )
                },
            }];
        } else if(this.props.order_type == 2) {
            scroll = {x:1300};
            columns = [{
                title: '商品名称（中文）',
                width: 150,
                key: 'goods_name_cn2',
                dataIndex:'goods_name_cn',
                render:(data,data1) => {
                    return (
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator(`goods_name_cn-${data1.stateID}`,{
                                rules: [{ required: true, message: '请完善！' }],
                                initialValue:data
                            })(
                                <Input size="default" style={{width:'150px',marginBottom:'0px'}} />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '商品名称（英文）',
                width: 150,
                key: 'goods_name_en2',
                dataIndex:'goods_name_en',
                render:(data,data1) => {
                    return (
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator(`goods_name_en-${data1.stateID}`,{
                                rules: [{ required: true, message: '请完善！' }],
                                initialValue:data
                            })(
                                <Input size="default" style={{width:'150px',marginBottom:'0px'}} />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '规格',
                key: 'specification2',
                dataIndex:'specification',
                render:(data,data1) => {
                    return (
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator(`specification-${data1.stateID}`,{
                                rules: [{ required: true, message: '请完善！' }],
                                initialValue:data
                            })(
                                <Input size="default" style={{width:'70px',marginBottom:'0px'}} />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '厂号',
                key: 'factory_no2',
                dataIndex:'factory_no',
                render:(data,data1) => {
                    return (
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator(`factory_no-${data1.stateID}`,{
                                rules: [{ required: true, message: '请完善！' }],
                                initialValue:data
                            })(
                                <Input size="default" style={{width:'80px',marginBottom:'0px'}} />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '销项税率',
                key: 'tax_point2',
                dataIndex:'tax_point',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`tax_point-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data && data.toString()
                        })(
                            <Select size="default" placeholder="请选择" style={{width:'60px'}} onSelect={(value, option)=>this.onSelect({value, option ,name:`tax_point_name-${data1.stateID}`})}>
                                {moneyCode}
                            </Select>
                        )}
                    </FormItem>)
                }
            },{
                title: '计量单位',
                key: 'unit2',
                dataIndex:'unit',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`unit-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Select size="default" style={{width:'60px'}} placeholder="请选择" onSelect={(value, option)=>this.onSelect({value, option ,name:`unit_name-${data1.stateID}`})}>
                                {unit}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, {
                title: '计价数量',
                key: 'num_pi2',
                dataIndex:'num_pi',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`num_pi-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Input size="default" style={{width:'80px',marginBottom:'0px'}} onChange={(e)=>{calculate({e:e,stateID:data1.stateID,slefin:`num_pi`})}}/>
                        )}
                    </FormItem>)
                }
            },{
                title: '箱数',
                key: 'box_num2',
                dataIndex:'box_num',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`box_num-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Input size="default" style={{width:'80px',marginBottom:'0px'}} />
                        )}
                    </FormItem>)
                }
            }, {
                title: '合同成交价（不含税）',
                key: 'good_total_price',
                dataIndex:'good_total_price',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`goods_total_price_pi-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Input size="default" style={{width:'110px',marginBottom:'0px'}} onChange={(e)=>{calculate({e:e,stateID:data1.stateID,slefin:`goods_total_price_pi`})}}/>
                        )}
                    </FormItem>)
                }
            }, {
                title: '单价',
                key: 'price_pi2',
                dataIndex:'price_pi',
                render:(data,data1) => {
                    return (<FormItem {...formItemLayout}>
                        {getFieldDecorator(`price_pi-${data1.stateID}`,{
                            rules: [{ required: true, message: '请完善！' }],
                            initialValue:data
                        })(
                            <Input size="default" disabled style={{width:'80px',marginBottom:'0px'}} />
                        )}
                    </FormItem>)
                }
            }, {
                title: '操作',
                width: 80,
                key: 'operation',
                fixed: 'right',
                render: (data,index,i) => {
                        if(datasource.length == 1) {
                            return (
                                <div>
                                    <img src={addGoodsimg} className="cz-img" onClick={addGoods}/>
                                </div>
                            )
                        }
                        return (
                            <div>
                                <img src={deleteGoodsimg} className="cz-img" onClick={()=>deleteGoods({stateID:data.stateID})} />
                                <img src={addGoodsimg} className="cz-img" onClick={addGoods} />
                            </div>
                        )

                },
            }];
        }

        return (
            <div className="TheOrder">
                <div className="header-message">
                    商品信息
                    <a href="javascript:;" className="input-file header-message-ls header-message-l">
                        导入商品数据
                        <input className="input-file-file" type="file" multiple onChange={(e)=>this.props.sendEXCLE(e)} />
                    </a>

                    <div className="header-message-ls">
                        <a href="javascript:;" onClick={()=>this.downloadexcle()}>下载excel模版</a>
                    </div>

                </div>
                <div className="formWrapP formWrapPSp">
                    <Table  pagination={false} columns={columns} dataSource={this.props.datasource} scroll={scroll}/>
                </div>
            </div>
        )
    }
}


TheOrder.propTypes = {};

export default TheOrder;