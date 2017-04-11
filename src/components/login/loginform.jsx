import React, {PropTypes, Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
// import passwordimg from 'public/img/password.png';
// import usersimg from 'public/img/users.png';

const FormItem = Form.Item;

class LoginForm extends Component {
    handleSubmit(e) {
        //e.preventDefault();
        const self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                self.props.login(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return   (
            <Form className="login-form">
                <FormItem>
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input addonBefore={<Icon type="user" style={{fontSize:'18px'}} />} size="large" placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input addonBefore={<Icon type="lock" style={{fontSize:'18px'}} />} size="large" type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={(event)=>this.handleSubmit(event)} className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )

    }
}

const Formreturn = Form.create()(LoginForm);

LoginForm.propTypes = {};

export default Formreturn;