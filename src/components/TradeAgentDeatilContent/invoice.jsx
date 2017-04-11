import React, {PropTypes, Component} from 'react';
import { Row , Col } from 'antd';

class Invoice extends Component {

    render() {
        const finance_head_info = this.props.finance_head_info || {};
        const file = finance_head_info && finance_head_info.file || {};
        const file_url = file && file.file_url || [];
        let imgFile;

        if(file_url) {
            imgFile = file_url.map((data) => {
                if(data && data.url && data.url.match('.pdf')) {
                    return (
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <div className="logonew border-ls" onClick={()=>this.props.showIMG({url:data.url})}>
                                点击预览
                            </div>
                        </Col>
                    )
                } else {
                    return (
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <div className="logonew">
                                <img src={data.url} onClick={()=>this.props.showIMG({url:data.url})}/>
                            </div>
                        </Col>
                    )
                }
            });
        }

        let style = {};
        if(file_url && file_url.length) {
            style = {
                display:'block'
            }
        }else {
            style = {
                display:'none'
            }
        }

        return (
            <div className="listpart" style={style}>
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

                        </Row>

                    </div>
                    <div className="showUploadImgArea">
                        <Row>
                            {imgFile}
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

Invoice.propTypes = {};

export default Invoice;