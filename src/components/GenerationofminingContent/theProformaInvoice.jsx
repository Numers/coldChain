import React, {PropTypes, Component} from 'react';
import {  Row , Col  } from 'antd';
class TheOrder extends Component {

    render() {

        const uploadList = this.props.upload.map((data) => {
            if(data && data.match('.pdf')) {
                return (
                    <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="returnimgwrap border-ls" onClick={()=>this.props.showIMG({url:data})}>
                            点击预览
                        </div>
                    </Col>
                )
            }else {
                return (
                    <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="returnimgwrap">
                            <img src={data} onClick={()=>this.props.showIMG({url:data})}/>
                        </div>
                    </Col>
                )
            }

        });

        return (
            <div className="TheOrder">
                <div className="header-message">
                    形式发票 / 采购订单附件
                </div>
                <div className="formWrapP">
                    <div className="uploadArea">

                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={5}>
                                <div className="uploadText">
                                    形式发票 / 采购订单附件
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={5}>
                                <div className="input-file input-add">
                                    上传图片
                                    <input className="input-file-file" type="file" multiple onChange={(e)=>this.props.uploadimg(e)} />
                                </div>
                            </Col>
                        </Row>

                    </div>
                    <div className="showUploadImgArea">
                        <Row>
                            {uploadList}
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

}


TheOrder.propTypes = {};

export default TheOrder;