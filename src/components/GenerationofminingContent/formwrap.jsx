import React, {PropTypes, Component} from 'react';
import { Form , Button } from 'antd';
import TheOrder from './theOrder';
import TheGoods from './theGoods';
import TheProformaInvoice from './theProformaInvoice';
import TradeInformation from './tradeInformation';
import TheFinancingAmount from './theFinancingAmount';
import OpenToSee from './openToSee';
import formatdata from 'formatdata';
import moment from 'moment';

const FormItem = Form.Item;
class Formwrap extends Component {

    componentDidMount() {
        const shouldRender = this.props.shouldRender;
        const queryin = this.props.queryin;
        if(shouldRender && !queryin) {
            const newFin = this.props.newFin;
            const from = this.props.from;
            const localData = localStorage.getItem('newfinancing');
            const form = this.props.form;
            const setlocaldata = this.props.setlocaldata;
            const updatedata = this.props.updatedata;
            if((from == 'draftbox' || newFin) && localData) {
                try {
                    const local = JSON.parse(localData);
                    let newlocal = Object.assign({},local);
                    if(!local.receive_goods_time) {
                        newlocal.receive_goods_time = '';
                    } else {
                        newlocal.receive_goods_time = this.props.order_type==2?moment(local.receive_goods_time,'YYYY-MM-DD'):'';
                    }

                    if(from == 'draftbox') {
                        /*
                         * 如果为草稿箱的 融资订单编号为草稿箱编号 融资订单编号为草稿箱编号 所以不做处理
                         * */

                    } else {
                        /*
                         * 如果为复制 融资订单编号改变 融资订单编号不变
                         * */
                        newlocal.refinance_order_no = this.props.refinance_order_no || '';
                    }


                    setTimeout(() => {

                        form.setFieldsValue(newlocal);

                        updatedata({
                            queryin:true
                        });

                        setlocaldata({
                            from:from,
                            id:this.props.id,
                            shouldRender:false,
                            from_addr_id_name : newlocal.from_addr_id_name,
                            to_addr_id_name : newlocal.to_addr_id_name,
                            offer_type_id_name : newlocal.offer_type_id_name,
                            agent_id_name : newlocal.agent_id_name,
                            depot_id_name : newlocal.depot_id_name,
                            purchase_payment_term_id_name : newlocal.purchase_payment_term_id_name,
                            end_days_name : newlocal.end_days_name,
                            money_code_name: newlocal.money_code_name,
                            upload:newlocal.upload
                        });

                    },100);

                } catch(ex) {

                }

            } else {
                setTimeout(() => {
                    form.setFieldsValue({
                        contract_no:this.props.contract_no || '',
                        refinance_order_no:this.props.refinance_order_no || ''
                    });

                    updatedata({
                        shouldRender:false
                    });

                },100);
            }

        }
    }

    componentDidUpdate() {

    }

    handleSubmit(params) {
        const e = params.e;
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                const foodData = formatdata({
                        type:'foodData',
                        data:{
                            judydata:this.props.foodData,
                            datasource:this.props.datasource
                        }
                    });

                const filedValue = Object.assign({},values);

                if( filedValue && filedValue.receive_goods_time) {
                    filedValue.receive_goods_time = filedValue.receive_goods_time.format('YYYY-MM-DD');
                }

                const formdatain = formatdata({
                    'type':'formdatain',
                    data:{
                        ...filedValue,
                        ...foodData
                    }
                });

                //计算所需的参数
                const money_code = filedValue['money_code'];
                const offer_type_id = filedValue['offer_type_id'];
                const purchase_payment_term_id = filedValue['purchase_payment_term_id'];
                const order_type = this.props.order_type;
                const datasource = this.props.datasource;
                const refinance_apply_id = this.props.refinance_apply_id;
                const calculateData = {
                    money_code,
                    offer_type_id,
                    order_type,
                    purchase_payment_term_id,
                    datasource,
                    refinance_apply_id
                }

                this.props.showAndCalculate({
                    visible:true,
                    formdatain:formdatain,
                    ...calculateData,
                    submit:true//用来判断是否由提交按钮发起的计算
                });

                // this.props.openToSeeFloat({
                //     visible:true,
                //     formdatain:formdatain
                // });

            }
        });
    }

    handledraft(params) {
        const e = params.e;
        e.preventDefault();

        const values = this.props.form.getFieldsValue();
        const foodData = formatdata({
            type:'foodData',
            data:{
                judydata:this.props.foodData,
                datasource:this.props.datasource
            }
        });

        const filedValue = Object.assign({},values);
        if( filedValue && filedValue.receive_goods_time) {
            filedValue.receive_goods_time = filedValue.receive_goods_time.format('YYYY-MM-DD');
        }

        const formdatain = formatdata({
            'type':'formdatain',
            data:{
                ...filedValue,
                ...foodData
            }
        });

        const submitData = Object.assign({},formdatain);

        //贸易类型
        submitData.order_type = this.props.order_type;
        submitData.file_type = 1;

        //形式发票
        submitData.file_info = formatdata({
            type:'imgformat',
            data:this.props.upload || []
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

        submitData.is_draft = 1;
        if(this.props.id) {
            submitData.refinance_apply_id = this.props.id;
        } else {
            submitData.refinance_apply_id = this.props.refinance_apply_id;
        }


        this.props.submit({submitData:submitData,draft:params.draft});
    }

    render() {
        return (
            <div className="Formwrap">
                <Form>
                    {/*订单信息*/}
                    <TheOrder {...this.props} />

                    {/*商品信息*/}
                    <TheGoods {...this.props} />

                    {/*形式发票采购订单*/}
                    <TheProformaInvoice {...this.props} />

                    {/*融资及贸易信息*/}
                    <TradeInformation {...this.props} />

                    {/*融资金额*/}
                    <TheFinancingAmount {...this.props} />

                    <FormItem wrapperCol={{ span: 6, offset: 9 }}>
                        <Button style={{width:'45%',marginTop:"10px",marginRight:"10px"}} onClick={(e)=>this.handledraft({e:e,draft:true})}>保存草稿</Button>
                        <Button type="primary" style={{width:'45%',marginTop:"10px",marginRight:"10px"}} onClick={(e)=>this.handleSubmit({e:e})}>提交</Button>
                    </FormItem>
                </Form>
                <OpenToSee {...this.props} />
            </div>
        )
    }
}

Formwrap.propTypes = {};

const returnForm = Form.create(
//     {
//     // mapPropsToFields(props) {
//     //     return {
//     //         "contract_no": {
//     //             value:props.contract_no || ''
//     //         },
//     //     };
//     // }
// }
)(Formwrap);

export default returnForm;