import './style.css';
import React, {PropTypes, Component} from 'react';
import { Form , Input, Button ,Select} from 'antd';
const FormItem = Form.Item;
const Options = Select.Option;
class Lookforall extends Component {

    resetvalue() {
        const form = this.props.form;
        const props = this.props;
        form.resetFields();
        form.validateFields((err, values) => {
            if (!err) {

                values.page = 1;
                values.refinance_apply_id = props.refinance_apply_id_choose;
                values.per = props.per;
                values.order_type_id = props.order_type_id;
                props.lookForSmallFn(values);

            }
        });
    }

    handleSubmit(e) {

        const form = this.props.form;
        const props = this.props;

        form.validateFields((err, values) => {
            if (!err) {

                values.page = 1;
                values.refinance_apply_id = props.refinance_apply_id_choose;
                values.per = props.per;
                values.order_type_id = props.order_type_id;
                props.lookForSmallFn(values);

            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const refinance_apply_id_choose = this.props.refinance_apply_id_choose;
        const token = localStorage && localStorage.getItem('token');
        return (
            <div className="lookforall">
                <Form inline>
                    <FormItem label='按商品名称（中文）查询' style={{marginBottom:'10px'}}>
                        {getFieldDecorator('goods_name_cn', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                            initialValue:''
                        })(
                            <Input  placeholder="按商品名称（中文）查询" />
                        )}
                    </FormItem>

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
                </Form>
                <div className="excle_download">
                    {refinance_apply_id_choose?(<a href={`/api/refll/expGoods?refinance_apply_id=${refinance_apply_id_choose}&token=${token}`}>导出excle</a>):''}
                </div>
            </div>
        )
    }
}

const returnForm = Form.create()(Lookforall);

export default returnForm;

Lookforall.propTypes = {};
