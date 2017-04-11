import React, {PropTypes, Component} from 'react';
import { Row , Col } from 'antd';

class InvoiceShow extends Component {

    render() {
        const dataShowListSingle = this.props.dataShowListSingle || {};
        const file_url = dataShowListSingle.file_url;
        const file_name = dataShowListSingle.file_name;

        const imgList = file_url.map((data) => {
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

        return (
            <div className="listpart">
                <div className="header-message">
                    {file_name}
                </div>
                <div className="formWrapP">
                    <div className="showUploadImgArea">
                        <Row>
                            {imgList}
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

InvoiceShow.propTypes = {};

export default InvoiceShow;