import './style.css';
import React, {PropTypes, Component} from 'react';
import { Form , Input, Button ,Select} from 'antd';
import formatdata from 'formatdata';

const FormItem = Form.Item;
const Options = Select.Option;
class Lookforall extends Component {

    componentDidMount() {
        this.props.setrate();
    }

    resetvalue() {
        const form = this.props.form;
        const props = this.props;
        form.resetFields();
        form.validateFields((err, values) => {
            if (!err) {
                const payload = {
                    ...values,
                    per:props.per,
                    page:1

                }

                this.props.queryrender(payload);

            }
        });
    }

    handleSubmit() {
        const form = this.props.form;
        const props = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const payload = {
                    ...values,
                    per:props.per,
                    page:1

                }
                this.props.queryrender(payload);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        let rateSelect;
        if(this.props.selectRate) {
            rateSelect = formatdata({
                type:'select',
                data:{
                    placeholder:'汇率',
                    datasource:this.props.selectRate || []
                }
            });
        } else {
            rateSelect = <Options key="sss" value="暂无">暂无</Options>;
        }

        return (
            <div className="lookfor">
                <Form inline>
                    <FormItem label='按pi号查询' style={{marginBottom:'10px'}}>
                        {getFieldDecorator('pi_no', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input  placeholder="按pi号查询" />
                        )}
                    </FormItem>
                    {/*<FormItem label='按贸易类型查询' style={{marginBottom:'10px'}}>*/}
                        {/*{getFieldDecorator('order_type', {*/}
                            {/*rules: [{ required: false, message: 'Please input your username!' }]*/}
                        {/*})(*/}
                            {/*<Select  placeholder="按贸易类型查询" style={{width:'80px'}}>*/}
                                {/*<Options value="2">外贸</Options>*/}
                                {/*<Options value="1">内贸</Options>*/}
                            {/*</Select>*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                    <FormItem>
                        <Button
                            className='btn-sub'
                            onClick={()=>this.resetvalue()}
                        >
                            清空
                        </Button>
                        <Button
                            className='btn-sub'
                            type="primary"
                            onClick={()=>this.handleSubmit()}
                        >
                            查询
                        </Button>
                    </FormItem>
                    <FormItem label='汇率' >
                        <Select placeholder="查询" style={{width:'110px'}}>
                            {rateSelect}
                        </Select>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const returnForm = Form.create()(Lookforall);

export default returnForm;

Lookforall.propTypes = {};
