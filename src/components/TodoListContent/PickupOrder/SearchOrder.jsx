import React from 'react';
import {Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class SearchOrder extends React.Component
{
    resetvalue() {
        const form = this.props.form;
        const setTableParams = this.props.setTableParams;
        form.resetFields();
        form.validateFields((err, values) => {
            if (!err) {
                setTableParams({buy_order_number:"",sku_name:""});
            }
        })
    }

    handleSubmit(e) {
        const form = this.props.form;
        const setTableParams = this.props.setTableParams;
        form.validateFields((err, values) => {
            if (!err) {
                setTableParams(values);
            }
        });
    }

    render()
    {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form inline>
                    <FormItem label='合同号' style={{marginBottom:'10px',marginRight:'30px'}}>
                        {getFieldDecorator('buy_order_number', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input  placeholder="查询" size="default" style={{width:'130px'}} />
                        )}
                    </FormItem>
                    <FormItem label='品名' style={{marginBottom:'10px',marginRight:'30px'}}>
                        {getFieldDecorator('sku_name', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input  placeholder="查询" size="default" style={{width:'130px'}} />
                        )}
                    </FormItem>
                 <FormItem >
                     <Button className="btn-sub" onClick={()=>this.resetvalue()} size="default">清空</Button>
                     <Button type="primary" className="btn-sub" onClick={()=>this.handleSubmit()} size="default">查询</Button>
                 </FormItem>
                </Form>
        );
    }
}

const returnOrderForm = Form.create()(SearchOrder);
export default returnOrderForm;