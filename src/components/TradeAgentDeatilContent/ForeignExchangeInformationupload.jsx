import React, {PropTypes, Component} from 'react';
import { Row , Col , Table , Form , DatePicker , Input , Button} from 'antd';
import formatdata from 'formatdata';
const FormItem = Form.Item;
class ForeignExchangeInformationupload extends Component {
    uploadSubmitFn() {
        const renderWhich = this.props.renderWhich || {};
        const refinance_apply_id = this.props.id;
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {

                const payload1 = {
                    ...fieldsValue,
                    exchange_time:fieldsValue['exchange_time'].format('YYYY-MM-DD'),
                    exchange_type:renderWhich.exchange_type,
                    refinance_apply_id:refinance_apply_id
                }

                const file_url = formatdata({
                    type:'file_url',
                    data:this.props.upLoadImgList
                });

                const file_type = this.props.renderWhich && this.props.renderWhich.file_type;

                const payload2 = {
                    refinance_apply_id:this.props.id,
                    file_info:file_url,
                    file_type:file_type
                };

                this.props.uploadSubmitGH({
                    payload1,
                    payload2
                });

            }
        });
    }

    onChange(e,all) {

        const event = e || window.e;
        const target = event && event.target;
        const rate = target && target.value;
        const money = all.money;
        if(rate && money) {
            const moneyAdd =  formatdata({
                type:'getFloat',
                data:{
                    number:money * rate,
                    n:'2'
                }
            });
            this.props.form.setFieldsValue({'money_cn':moneyAdd})
        }else {
            this.props.form.setFieldsValue({'money_cn':''})
        }
    }

    render() {

        const renderWhich = this.props.renderWhich || {};
        const title = renderWhich.title;
        if(!renderWhich || !renderWhich.render) {
            return (
                <div></div>
            )
        }

        const { getFieldDecorator } = this.props.form;

        const columns = [{
            title: renderWhich&&renderWhich.exchange_type == 1?'收GLP预付日期':'收GLP尾款日期',
            width: 150,
            fixed: 'left',
            dataIndex:'payment_time',
        },{
            title: renderWhich&&renderWhich.exchange_type == 1?'收GLP预付':'收GLP尾款',
            width: 150,
            fixed: 'left',
            dataIndex:'actual_money'
        },{
            title: '购汇日期',
            render:(data)=> {
                return (
                    <FormItem>
                        {getFieldDecorator('exchange_time',{
                            rules: [{ required: true, message: '请完善！' }],
                        })(
                            <DatePicker format="YYYY-MM-DD" />
                        )}
                    </FormItem>
                )
            }
        },{
            title: '币种',
            dataIndex:'money_code'
        },{
            title: '购汇汇率',
            dataIndex:'exchange_rate',
            render:(data,all) => {
                return (
                    <FormItem>
                        {getFieldDecorator('exchange_rate',{
                            rules: [{ required: true, message: '请完善！' }],
                        })(
                            <Input onChange={(e) => this.onChange(e,all)} />
                        )}
                    </FormItem>
                )
            }
        },{
            title: renderWhich&&renderWhich.exchange_type == 1?'付出预付（外币）':'付出尾款（外币）',
            dataIndex:'money',
        }, {
            title: renderWhich&&renderWhich.exchange_type == 1?'付出预付（人民币）':'付出尾款（人民币）',
            dataIndex:'money_cn',
            render:() => {
                return (
                    <FormItem>
                        {getFieldDecorator('money_cn',{
                            rules: [{ required: true, message: '请完善！' }],
                        })(
                            <Input  />
                        )}
                    </FormItem>
                )
            }
        }];

        const dataSource = this.props.datasource;
        const upLoadImgList = this.props.upLoadImgList || [];
        const upLoadImgListImg = upLoadImgList.map((data) => {
            if(data && data.match('.pdf')) {
                return (
                    <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="logonew border-ls" onClick={()=>this.props.showIMG({url:data})}>
                            点击预览
                        </div>
                    </Col>
                )
            } else {
                return (
                    <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="logonew">
                            <img src={data} onClick={()=>this.props.showIMG({url:data})}/>
                        </div>
                    </Col>
                )
            }
        });


        return (
            <Form inline>
                <div className="listpart">
                    <div className="header-message">
                        {title}
                    </div>
                    <div className="formWrapP">
                        <div className="tablearea">
                            <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ x: 1000 }}/>
                        </div>
                        <div className="uploadArea">

                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={5}>
                                    <div className="uploadText">
                                        {renderWhich.title}
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={5}>
                                    <div className="input-file">
                                        上传图片
                                        <input className="input-file-file" type="file" multiple onChange={(e)=>this.props.upload(e)} />
                                    </div>
                                </Col>
                            </Row>

                        </div>
                        <div className="showUploadImgArea">
                            <Row gutter={20}>
                                {upLoadImgListImg}
                            </Row>
                            <div className="btn-wrap-img">
                                {upLoadImgList && upLoadImgList.length?(
                                    <FormItem>
                                        <Button type="primary" onClick={() => this.uploadSubmitFn()}>提交</Button>
                                    </FormItem>
                                ):''}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}

const returnForm = Form.create()(ForeignExchangeInformationupload);

ForeignExchangeInformationupload.propTypes = {};

export default returnForm;