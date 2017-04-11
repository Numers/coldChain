import React, {PropTypes, Component} from 'react';
import { Form , Table , Input , DatePicker , Button} from 'antd';
import formatdata from 'formatdata';
import moment from 'moment';

const FormItem = Form.Item;
class Goods extends Component {
    submitFormtariff() {
        const form = this.props.form;
        const props = this.props;

        const refinance_apply_id = this.props.id;

        const offer_type_id = this.props.finance_head_info && this.props.finance_head_info.offer_type_id;
        form.validateFields((err,values) => {
            if(!err) {
                const fieldvalues = Object.assign({},values);

                const tax_paytime = fieldvalues['tax_paytime'].format('YYYY-MM-DD');
                fieldvalues.tax_paytime = tax_paytime;

                const goods_info_obj = formatdata({
                    type:'formdatain',
                    data:fieldvalues
                });

                let goods_info = [];
                let payload = {};
                if(goods_info_obj && goods_info_obj.goods_info) {
                    for(let i in goods_info_obj.goods_info) {
                        const objectgoods = Object.assign({},goods_info_obj.goods_info[i]);
                        objectgoods.goods_id = i;
                        goods_info.push(objectgoods);
                    }
                }

                payload.refinance_apply_id = refinance_apply_id;
                payload.offer_type_id = offer_type_id;
                payload.goods_info = goods_info;
                payload.tax_paytime = tax_paytime;
                payload.url = '/api/refll/savevat';
                props.updateCI(payload)
            }
        });
    }

    submitForm() {

        const form = this.props.form;
        const props = this.props;

        const refinance_apply_id = this.props.id;

        const offer_type_id = this.props.finance_head_info && this.props.finance_head_info.offer_type_id;

        form.validateFields((err,values) => {
            if(!err) {
                const fieldvalues = Object.assign({},values);
                fieldvalues.tax_paytime = moment(fieldvalues.tax_paytime,'YYYY-MM-DD');'';

                const goods_info_obj = formatdata({
                    type:'formdatain',
                    data:fieldvalues
                });
                let goods_info = [];
                let payload = {};

                if(goods_info_obj && goods_info_obj.goods_info) {
                    for(let i in goods_info_obj.goods_info) {
                        const objectgoods = Object.assign({},goods_info_obj.goods_info[i]);
                        objectgoods.goods_id = i;
                        goods_info.push(objectgoods);
                    }
                }

                payload.refinance_apply_id = refinance_apply_id;
                payload.offer_type_id = offer_type_id;
                payload.goods_info = goods_info;

                props.updateCI(payload);
            }
        });
    }

    coculatein(payload) {
        const form = this.props.form;
        const num_ci = `num_ci-${payload.goods_id}`;
        const price_ci = `price_ci-${payload.goods_id}`;
        const goods_total_price_ci = `goods_total_price_ci-${payload.goods_id}`;
        setTimeout(() => {
            const num_ciLS = form.getFieldValue(num_ci);
            const goods_total_price_ciLS = form.getFieldValue(goods_total_price_ci);
            if(num_ciLS && goods_total_price_ciLS) {
                const x = goods_total_price_ciLS/num_ciLS;
                let value = {

                }
                value[price_ci] = {value:x};
                form.setFields(value);
            }
        },10);

    }

    render() {
        let scroll;
        if(this.props.flag == 12) {
            scroll = { x: 1800 };
            const props = this.props;
            const { getFieldDecorator } = this.props.form;
            const data = this.props.finance_goods_info;
            const columns = [{
                title: '商品名称（中文）',
                width: 150,
                key: 'goods_name_cn',
                fixed: 'left',
                dataIndex:'goods_name_cn',
            },{
                title: '商品名称（英文）',
                width: 150,
                key: 'goods_name_en',
                dataIndex:'goods_name_en'
            },{
                title: '规格',
                key: 'specification',
                dataIndex:'specification'
            },{
                title: '厂号',
                key: 'factory_no',
                dataIndex:'factory_no'
            },{
                title: '销项税率',
                key: 'tax_point',
                dataIndex:'tax_point'
            },{
                title: '计量单位',
                key: 'unit',
                dataIndex:'unit'
            }, {
                title: '计价数量',
                key: 'num_pi',
                dataIndex:'num_pi',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '箱数',
                key: 'box_num',
                dataIndex:'box_num',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '单价',
                key: 'price_pi',
                dataIndex:'price_pi',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '货值总金额（不含税）',
                key: 'goods_total_price_pi',
                dataIndex:'goods_total_price_pi',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '柜号',
                key: 'cabinet_no',
                dataIndex: 'cabinet_no'
            },{
                title: '数量',
                key: 'num_ci',
                dataIndex: 'num_ci',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '单价',
                key: 'price_ci',
                dataIndex: 'price_ci',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '货值总金额(CI)',
                key: 'goods_total_price_ci',
                dataIndex: 'goods_total_price_ci',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '关税',
                key: 'tariff',
                render:(data)=> {
                    return (
                        <FormItem>
                            {getFieldDecorator(`tariff-${data.id}`, {
                                rules: [{
                                    required: true, message: '请填写',
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '进口增值税',
                key: 'import_vat',
                render:(data)=> {
                    return (
                        <FormItem>
                            {getFieldDecorator(`import_vat-${data.id}`, {
                                rules: [{
                                    required: true, message: '请填写',
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '时间',
                key: 'tax_paytime',
                render:(data,t,index)=> {

                    if(index == 0) {
                        return (
                            <FormItem>
                                {getFieldDecorator(`tax_paytime`, {
                                    rules: [{
                                        required: true, message: '请填写',
                                    }]
                                })(
                                    <DatePicker style={{'width':'100%'}} format="YYYY-MM-DD" />
                                )}
                            </FormItem>
                        )
                    }else {
                        return (
                            <FormItem>
                                {getFieldDecorator(`tax_paytime`, {
                                    rules: [{
                                        required: true, message: '请填写',
                                    }]
                                })(
                                    <DatePicker disabled style={{'width':'100%'}} format="YYYY-MM-DD" />
                                )}
                            </FormItem>
                        )
                    }

                }
            }];

            return (
                <Form inline>
                    <div className="listpart">
                        <div className="header-message">
                            商品信息
                        </div>
                        <div className="formWrapP">
                            <Table  pagination={false} columns={columns} dataSource={data} scroll={{ x: 1800 }} />
                            <div className="submitci">
                                <Button type="primary" onClick={()=>this.submitFormtariff()}>提交</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            )
        }

        if(this.props.flag == 6) {
            scroll = { x: 1450 };
            const props = this.props;
            const coculate = (payload) => this.coculatein(payload);
            const { getFieldDecorator } = this.props.form;
            const columns = [{
                title: '商品名称（中文）',
                width: 150,
                key: 'goods_name_cn',
                fixed: 'left',
                dataIndex:'goods_name_cn',
            },{
                title: '商品名称（英文）',
                width: 150,
                key: 'goods_name_en',
                dataIndex:'goods_name_en'
            },{
                title: '规格',
                key: 'specification',
                dataIndex:'specification'
            },{
                title: '厂号',
                key: 'factory_no',
                dataIndex:'factory_no'
            },{
                title: '销项税率',
                key: 'tax_point',
                dataIndex:'tax_point',
                render:(data) => {
                    return `${data}%`
                }
            },{
                title: '计量单位',
                key: 'unit',
                dataIndex:'unit',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '数量',
                key: 'num_pi',
                dataIndex:'num_pi',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '箱数',
                key: 'box_num',
                dataIndex:'box_num',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '单价',
                key: 'price_pi',
                dataIndex:'price_pi',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            }, {
                title: '货值总金额（不含税）',
                key: 'goods_total_price_pi',
                dataIndex:'goods_total_price_pi',
                render:(data)=>{
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '柜号',
                key: 'cabinet_no',
                render:(data)=> {
                    return (
                        <FormItem>
                            {getFieldDecorator(`cabinet_no-${data.id}`, {
                                rules: [{
                                    required: true, message: '请填写',
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '箱数CI',
                key: 'box_num_ci',
                render:(data)=> {
                    return (
                        <FormItem>
                            {getFieldDecorator(`box_num_ci-${data.id}`, {
                                rules: [{
                                    required: true, message: '请填写',
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '数量',
                key: 'num_ci',
                render:(data)=> {
                    const payload = {
                        key:'num_ci',
                        goods_id:data.id,
                    }

                    return (
                        <FormItem>
                            {getFieldDecorator(`num_ci-${data.id}`, {
                                rules: [{
                                    required: true, message: '请填写',
                                }]
                            })(
                                <Input onChange={(e)=>coculate(payload)}/>
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '货值总金额(CI)',
                key: 'goods_total_price_ci',
                render:(data) => {

                    const payload = {
                        key:'goods_total_price_ci',
                        goods_id:data.id,
                    }

                    return (
                        <FormItem>
                            {getFieldDecorator(`goods_total_price_ci-${data.id}`, {
                                rules: [{
                                    required: true, message: '请填写',
                                }]
                            })(
                                <Input onChange={()=>coculate(payload)} />
                            )}
                        </FormItem>
                    )
                }
            },{
                title: '单价',
                key: 'price_ci',
                render:(data) => {

                    return (
                        <FormItem>
                            {getFieldDecorator(`price_ci-${data.id}`, {
                                rules: [{
                                    required: true, message: '请填写',
                                }]
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                    )

                }
            }];

            const data = this.props.finance_goods_info;

            return (
                <Form inline>
                    <div className="listpart">
                        <div className="header-message">
                            商品信息
                        </div>
                        <div className="formWrapP">
                            <Table  pagination={false} columns={columns} dataSource={data} scroll={{ x: 1850 }} />
                            <div className="submitci">
                                <Button type="primary" onClick={()=>this.submitForm()}>提交</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            )
        }

        let columns = [{
            title: '商品名称（中文）',
            width: 150,
            key: 'goods_name_cn',
            fixed: 'left',
            dataIndex:'goods_name_cn',
        },{
            title: '规格',
            key: 'specification',
            dataIndex:'specification'
        },{
            title: '厂号',
            key: 'factory_no',
            dataIndex:'factory_no'
        },{
            title: '销项税率',
            key: 'tax_point',
            dataIndex:'tax_point',
            render:(data) => {
                return `${data}%`
            }
        },{
            title: '计量单位',
            key: 'unit',
            dataIndex:'unit',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }, {
            title: '计价数量',
            key: 'num_pi',
            dataIndex:'num_pi',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '箱数',
            key: 'box_num',
            dataIndex:'box_num',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }, {
            title: '单价',
            key: 'price_pi',
            dataIndex:'price_pi',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }];

        let add1 = [{
            title: '合同成交价（不含税）',
            key: 'goods_total_price_pi',
            dataIndex:'goods_total_price_pi',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }];

        let add2 = [{
            title: '柜号',
            key: 'cabinet_no',
            dataIndex: 'cabinet_no'
        },{
            title: '计价数量',
            key: 'num_ci',
            dataIndex: 'num_ci',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '箱数(CI)',
            key: 'box_num_ci',
            dataIndex:'box_num_ci',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '单价',
            key: 'price_ci',
            dataIndex: 'price_ci',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '合同成交价(CI)',
            key: 'goods_total_price_ci',
            dataIndex: 'goods_total_price_ci',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }];

        let add3 = [{
            title: '关税(人民币)',
            key: 'tariff',
            dataIndex: 'tariff',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '进口增值税(人民币)',
            key: 'import_vat',
            dataIndex: 'import_vat',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '时间',
            key: 'tax_paytime',
            dataIndex: 'tax_paytime'
        }]

        columns.splice(1,0,{
            title: '商品名称（英文）',
            width: 150,
            key: 'goods_name_en',
            dataIndex:'goods_name_en'
        });

        columns = columns.concat(add1);
        scroll = { x: 1100 };
        if(this.props.tradeStatus >= 4 && this.props.tradeStatus < 6) {
            scroll = { x: 1450 };
            columns = columns.concat(add2);
        } else if(this.props.tradeStatus >= 6) {
            scroll = { x: 1850 };
            columns = columns.concat(add2,add3);
        }

        const data = this.props.finance_goods_info;

        return (
            <Form inline>
                <div className="listpart">
                    <div className="header-message">
                        商品信息
                    </div>
                    <div className="formWrapP">
                        <Table  pagination={false} columns={columns} dataSource={data} scroll={scroll} />
                    </div>
                </div>
            </Form>
        )
    }
}

const returnForm = Form.create()(Goods);

Goods.propTypes = {};

export default returnForm;