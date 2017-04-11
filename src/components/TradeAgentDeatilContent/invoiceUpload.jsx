import React, {PropTypes, Component} from 'react';
import { Row , Col , Button} from 'antd';
import formatdata from 'formatdata';

class InvoiceUpload extends Component {
    uploadSubmitFn() {

        const file_url = formatdata({
            type:'file_url',
            data:this.props.upLoadImgList
        });

        const file_type = this.props.renderWhich && this.props.renderWhich.file_type;

        const payload = {
            refinance_apply_id:this.props.id,
            file_info:file_url,
            file_type:file_type
        };

        this.props.uploadSubmit(payload);

    }

    download() {
        const renderWhich = this.props.renderWhich || {};
        const flag = renderWhich && renderWhich.flag;
        const token = localStorage.getItem('token');
        const refinance_apply_id = this.props.id;
        window.open(`/api/file/fileup?token=${token}&refinance_apply_id=${refinance_apply_id}&flag=${flag}`);
        //this.props.downloadAttachment(payload);
    }

    render() {
        const renderWhich = this.props.renderWhich;
        const flag = renderWhich && renderWhich.flag;
        let renderDownload;
        if(!renderWhich || !renderWhich.render) {
            return (
                <div></div>
            )
        }

        if(flag) {
            renderDownload = (
                <div className="input-file" onClick={()=>this.download()}>
                    下载附件
                </div>
            );
        }else {
            renderDownload = '';
        }

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
            <div className="listpart">
                <div className="header-message">
                    {renderWhich.title}
                </div>
                <div className="formWrapP">
                    <div className="uploadArea">

                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={5}>
                                <div className="uploadText">
                                    {renderWhich.title}
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={5}>
                                {renderDownload}
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
                            {upLoadImgList && upLoadImgList.length?<Button type="primary" onClick={() => this.uploadSubmitFn()}>提交</Button>:''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

InvoiceUpload.propTypes = {};

export default InvoiceUpload;