import {Form, Icon, Input, Button,Select } from 'antd';
import React from 'react';
import formatdata from 'formatdata';
import '../style.css'
const FormItem = Form.Item;
const Options = Select.Option;

class SearchDraftBox extends React.Component
{
    resetvalue() {
        const form = this.props.form;
        const resetTable = this.props.resetTable;
        form.resetFields();
        form.validateFields((err, values) => {
            if (!err) {
                resetTable({});
            }
        })
    }

    handleSubmit(e) {
        const form = this.props.form;
        const setTableParams = this.props.setTableParams;
        form.validateFields((err, values) => {
            if (!err) {
                values.page = 1;
                values.per = this.props.per;
                setTableParams(values);
            }
        });
    }

    render()
    {
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
            rateSelect = formatdata({
                type:'select',
                data:{
                    datasource:this.props.selectRate || []
                }
            });
        }
        return (
            <div className="lookforall">
                <Form inline>
                    <FormItem label='购销合同号' style={{marginBottom:'10px',marginRight:'30px'}}>
                        {getFieldDecorator('contract_no', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input  placeholder="查询" size="default" style={{width:'100px'}}/>
                        )}
                    </FormItem>
                    <FormItem label='PI号' style={{marginBottom:'10px',marginRight:'30px'}}>
                        {getFieldDecorator('pi_no', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input  placeholder="查询" size="default" style={{width:'100px'}} />
                        )}
                    </FormItem>
                    <FormItem label='贸易类型' style={{marginBottom:'10px',marginRight:'30px'}}>
                        {getFieldDecorator('order_type', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                        })(
                            <Select  placeholder="查询" size="default" style={{width:'80px'}}>
                                <Options value="2">外贸</Options>
                                <Options value="1">内贸</Options>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            className='btn-sub'
                            size="default"
                            onClick={()=>this.resetvalue()}
                        >
                            清空
                        </Button>
                        <Button
                            className='btn-sub'
                            size="default"
                            type="primary"
                            onClick={()=>this.handleSubmit()}
                        >
                            查询
                        </Button>
                        {this.props.showNewFin?(<Button
                            className='btn-sub'
                            type="primary"
                            size="default"
                            onClick={() => this.handleGoto()}
                        >
                            复制
                        </Button>):""}
                    </FormItem>
                    <div className="ls-right">
                        <FormItem label='汇率'>
                            <Select placeholder="查询" size="default" style={{width:'110px'}}>
                                {rateSelect}
                            </Select>
                        </FormItem>
                    </div>
                </Form>
            </div>);
    }
}

const returnSearchDraftBox = Form.create()(SearchDraftBox);
export  default returnSearchDraftBox;