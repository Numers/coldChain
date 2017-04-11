import React, {PropTypes, Component} from 'react';
import { Row , Col , Table } from 'antd';
import logonew from 'public/img/logonew.png';

class ForeignExchangeInformation extends Component {

    render() {

        const columns = this.props.columns;
        const datasource = this.props.datasource || {};
        console.log(datasource,'datasource');
        const file = datasource.file &&  datasource.file[0] || {};
        const file_url = file && file.file_url || [];
        const exchange_type = datasource.exchange_type;//区分购汇类型
        let dataSource = [];
        dataSource.push(datasource);

        const imgFile = file_url.map((data) => {
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
                    {exchange_type==1?"GLP预付款购汇信息":"GLP尾款购汇信息"}
                </div>
                <div className="formWrapP">
                    <Table  pagination={false} columns={columns} dataSource={dataSource} scroll={{ x: 1000 }} />
                    <div className="TheOrder">

                        <div className="header-message mls">
                            {file.file_name}
                        </div>

                        <div className="showUploadImgArea">

                            <Row gutter={20}>
                                {imgFile}
                            </Row>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

ForeignExchangeInformation.propTypes = {};

export default ForeignExchangeInformation;