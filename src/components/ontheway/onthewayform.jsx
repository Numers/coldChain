import './style.css';
import React, {PropTypes, Component} from 'react';
import { Form, Icon, Input, Button , DatePicker} from 'antd';
const FormItem = Form.Item;

import tihuodan from "public/img/tihuodan.png";

class onthewayForm extends Component {

    resetvalue() {
        const form = this.props.form;
        const setTableParams = this.props.setTableParams;

        form.resetFields();
        form.validateFields((err, values) => {
            if (!err) {
                setTableParams({pi:""});
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
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="onthewayForm">
                <Form inline>
                    <FormItem>
                        {getFieldDecorator('pi', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input suffix={<img src={tihuodan} className="tihuodan"/>} placeholder="按PI号查找" />
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

const returnForm = Form.create()(onthewayForm);

export default returnForm;

onthewayForm.propTypes = {};
