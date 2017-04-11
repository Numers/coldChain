import React, {PropTypes, Component} from 'react';
import { Row , Col } from 'antd';

class AttachmentInformationShow extends Component {

    render() {

        const finance_file_infoSingle = this.props.finance_file_infoSingle;

        const file_url = finance_file_infoSingle.file_url || [];
        const upLoadImgListImg = file_url.map((data) => {
            if(data && data.url && data.url.match('.pdf')) {
                return (
                    <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="logonew border-ls" onClick={()=>this.props.showIMG({url:data.url})}>
                            点击预览
                        </div>
                    </Col>
                )
            }else {
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
            <div className="TheOrder">
                <div className="header-message">
                    {finance_file_infoSingle.file_name}
                </div>
                <div className="formWrapP">

                    <div className="showUploadImgArea">

                        <Row gutter={20}>
                            {upLoadImgListImg}
                        </Row>

                    </div>

                </div>
            </div>
        )
    }

}


AttachmentInformationShow.propTypes = {};

export default AttachmentInformationShow;