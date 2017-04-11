import React, {PropTypes, Component} from 'react';
import { Form, Icon, Input ,Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

import cangku from 'public/img/cangku.png';
import name from 'public/img/name.png';
import sjphone from 'public/img/sjphone.png';
import car from 'public/img/car.png';


class ListFormSingle extends Component {
    driverSubmit(e) {
        const stateId = this.props.stateId;
        const form = this.props.form;
        setTimeout(() => {
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.props.driverSubmit({stateId:stateId,values:values})
                }
            });
        },10);

    }

    render() {

        const { getFieldDecorator } = this.props.form;

        let opationList = this.props.warehouseList.map((data,index) => {
            return (
                <Option value={data.warehouse_number} key={index} >{data.warehouse_name}</Option>
            )
        });


        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };

        return (

            <Form className="login-form">
                <FormItem label={<img src={cangku} className="labelimg"/>} {...formItemLayout} >
                    {getFieldDecorator('warehouse_number', {
                        initialValue: '',
                        rules:[{
                            required: false, message: '！',
                        }]
                    })(
                        <Select size="default" dropdownStyle={{minWidth:"200px"}} onChange={()=>this.driverSubmit()}>
                            {opationList}
                        </Select>
                    )}
                </FormItem>

                <FormItem label={<img src={name} className="labelimg"/>} {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: '',
                        rules: [{ required: false, message: '' }],
                    })(
                        <Input size="default" placeholder="司机姓名" onChange={()=>this.driverSubmit()} />
                    )}
                </FormItem>
                <FormItem label={<img src={sjphone} className="labelimg"/>} {...formItemLayout}>
                    {getFieldDecorator('mobile', {
                        initialValue: '',
                        rules: [{ required: false, message: '' }],
                    })(
                        <Input size="default" placeholder="手机号码" onChange={()=>this.driverSubmit()} />
                    )}
                </FormItem>
                <FormItem label={<img src={car} className="labelimg"/>} {...formItemLayout}>
                    {getFieldDecorator('number', {
                        initialValue: '',
                        rules: [{ required: false, message: '' }],
                    })(
                        <Input size="default" placeholder="车牌信息" onChange={()=>this.driverSubmit()} />
                    )}
                </FormItem>
            </Form>

        )
    }
}

const returnForm = Form.create()(ListFormSingle);

export default returnForm;