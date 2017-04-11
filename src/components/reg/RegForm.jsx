import React, {PropTypes, Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class RegForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false,
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const checklist = this.props.checklist;
        this.props.form.validateFieldsAndScroll(checklist,(err, values) => {
            if (!err) {
                this.props.submit(values);
            }
        });
    }

    handlePasswordBlur(e) {
        const value = e.target.value;
        this.setState({ passwordDirty: this.state.passwordDirty || !!value });
    }

    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致！');
        } else {
            callback();
        }
    }

    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    getCaptcha(event) {
        const form = this.props.form;
        const phone = form.validateFields(['mobile'],(err,values) => {

            if(!err) {
                this.props.getCaptcha(values);
            }

        });

    }

    render () {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                span: 8,
                offset: 8,
            },
        };
        //样式  控制显示隐藏
        const cb_name = this.props.uptoUsertype && this.props.uptoUsertype.isShow?{}:{display:'none'};
        const projectType = this.props.uptoProjectType && this.props.uptoProjectType.isShow?{}:{display:'none'};
        //数据

        //用户类型数据渲染
        const userTypeData = this.props.userTypeData;
        const opationList = userTypeData.map((data)=>{
            return (
                <Option value={data.id} key={data.name}>{data.name}</Option>
            )
        });

        //项目类型数据渲染
        const projectTypeData = this.props.projectTypeData;
        const projectopationList = projectTypeData.map((data)=>{
            return (
                <Option value={data.id} key={data.name}>{data.name}</Option>
            )
        });

        //业务类型数据渲染
        const businessTypeData = this.props.uptoProjectType.data;
        const businessopationList = businessTypeData.map((data)=>{
            return (
                <Option value={data.id} key={data.name}>{data.name}</Option>
            )
        });

        return (
            <Form>
                <FormItem {...formItemLayout} label="用户类型" hasFeedback>
                    {getFieldDecorator('type', {
                        initialValue: '',
                        rules:[{
                            required: true, message: '请填写用户类型！',
                        }]
                    })(
                        <Select size="large" onChange={(params)=>this.props.userTypeFn(params)}>
                            {opationList}
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="公司名称"
                    hasFeedback
                    style={cb_name}
                >
                    {getFieldDecorator('c_name', {
                        rules: [{
                            required: true, message: '请填写公司名称',
                        }]
                    })(
                        <Input type="text" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="申请人姓名"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请填写申请人姓名',
                        }]
                    })(
                        <Input type="text" />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="项目类型" hasFeedback>
                    {getFieldDecorator('project_id', {
                        initialValue: '',
                        rules:[{
                            required: true, message: '请填写项目类型!',
                        }]
                    })(
                        <Select size="large" onChange={(params)=>this.props.projectTypeFn(params)}>
                            {projectopationList}
                        </Select>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="业务类型" hasFeedback style={projectType}>
                    {getFieldDecorator('business_id', {
                        initialValue: '',
                        rules:[{
                            required: true, message: '请填写业务类型!',
                        }]
                    })(
                        <Select size="large" >
                            {businessopationList}
                        </Select>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="手机号码" hasFeedback>
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="验证码"
                    //extra="We must make sure that your are a human."
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('verify_code', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(
                                <Input size="large" />
                            )}
                        </Col>
                        <Col span={12}>
                            <Button size="large" onClick={(event)=>this.getCaptcha(event)}>发送验证码</Button>
                        </Col>
                    </Row>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码！',
                        }, {
                            validator: (rule, value, callback)=>this.checkConfirm(rule, value, callback),
                        }],
                    })(
                        <Input type="password" onBlur={(event)=>this.handlePasswordBlur(event)} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="再次输入"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入密码！',
                        }, {
                            validator: (rule, value, callback) => this.checkPassword(rule, value, callback),
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" size="large" style={{width:"100%"}} onClick={(event)=>this.handleSubmit(event)}>提交注册</Button>
                </FormItem>
            </Form>
        );
    }
}

const returnForm = Form.create()(RegForm);

RegForm.PropTypes = {}

export default returnForm;
