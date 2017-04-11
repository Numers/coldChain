import './style.css';
import React, {PropTypes, Component} from 'react';
import { Form, Icon, Input, Button , DatePicker} from 'antd';
const FormItem = Form.Item;

import tihuodan from "public/img/tihuodan.png";

class pickcenterForm extends Component {

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

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div className="pickcenterForm">
                <Form inline>
                    <FormItem>
                        {getFieldDecorator('buy_order_number', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input suffix={<img src={tihuodan} className="tihuodan"/>} placeholder="按合同号查找" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('sku_name', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input suffix={<img src={tihuodan} className="tihuodan"/>} placeholder="按品名查询" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            onClick={()=>this.resetvalue()}
                        >
                            清空
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            onClick={()=>this.handleSubmit()}
                        >
                            查询
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const returnForm = Form.create()(pickcenterForm);

export default returnForm;

pickcenterForm.propTypes = {};
