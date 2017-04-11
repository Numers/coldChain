import React, {PropTypes, Component} from 'react';
import { message } from 'antd';
import addFile from 'public/img/addFile.png';
import formatdata from 'formatdata';

export default class UploadWaterbills extends Component {

    render() {
        const payfordata = this.props.payfordata;
        const imgUrl = this.props.imgUrl;
        const status = payfordata.status;
        let shouldShowImg;
        let imputShow;
        let buttonetc;

        const amount = formatdata({
            type:'priceadd',
            data:payfordata.amount
        });

        const fea = formatdata({
            type:'priceadd',
            data:payfordata.fea
        });

        const load = formatdata({
            type:'priceadd',
            data:payfordata.load
        });

        const tax = formatdata({
            type:'priceadd',
            data:payfordata.tax
        });

        const interest = formatdata({
            type:'priceadd',
            data:payfordata.interest
        });

        const amount_tariff = formatdata({
            type:'priceadd',
            data:payfordata.amount_tariff
        });

        const poundage = formatdata({
            type:'priceadd',
            data:payfordata.poundage
        });

        if(payfordata && payfordata.image_url) {

            shouldShowImg = (<img src={payfordata.image_url} className="uploadimgAbs" />);

        } else if(imgUrl) {

            shouldShowImg = (<img src={imgUrl} className="uploadimgAbs" />);

        } else {

            shouldShowImg = (<div></div>);

        }

        if(status>3) {
            buttonetc = "";
            imputShow = (<div className="uploadbutton" onClick={() => this.props.handleChangeShow({
                url:payfordata.image_url,
                visible:true
            })}>
                预览
            </div>);

        }else {

            imputShow = (<input type="file" className="uploadinputAbs" onChange={(x) => this.props.uploadImgFile(x)}/>);
            buttonetc = (<div>
                <div className="uploadbutton" onClick={() => this.props.uplaodreal(imgUrl)}>
                    确认上传
                </div>
                <div className="beforeload">
                    * 请上传银行付款后获得的流水单， 图片大小不超过5M,支持gif、png、jpg、bmp格式
                </div>
            </div>);
        }

        if(payfordata.status<3 || payfordata.status == 4) {
            return (
                <div className="uploadWaterbills">

                </div>
            )
        }else {
            return (
                <div className="uploadWaterbills">
                    <div className="uploadWaterbillsWrap">
                        <div className="uploadheader">
                            上传水单
                        </div>
                        <div className="uploadcontent">

                            <div className="uploadcontentWrap">
                                <ul>
                                    <li className="list_li clearfix">
                                        <div className="item_li">收款人开户行:</div>
                                        <div className="item_li_r">{payfordata.bank_name}</div>
                                    </li>

                                    <li className="list_li clearfix">
                                        <div className="item_li">收款账号:</div>
                                        <div className="item_li_r">{payfordata.bank_number}</div>
                                    </li>

                                    <li className="list_li clearfix">
                                        <div className="item_li">收款人全称:</div>
                                        <div className="item_li_r">{payfordata.bank_full_name}</div>
                                    </li>

                                    <li className="list_li clearfix">
                                        <div className="item_li">含税付款总额（美元货值）:</div>
                                        <div className="item_li_r">
                                            <div className="color_sp">
                                                ¥{amount} ({fea}$)
                                            </div>
                                            <div className="check_detail" onClick={()=>this.props.showDetail(payfordata.number)}>查看明细</div>
                                        </div>
                                    </li>

                                    <li className="list_li mt_sp clearfix">
                                        <div className="item_li">
                                            <span>货款:</span>
                                            <span className="sp_mt_l">{load}</span>
                                        </div>
                                        <div className="item_li">
                                            <span>销项增值税:</span>
                                            <span className="sp_mt_l">{tax}</span>
                                        </div>
                                    </li>

                                    <li className="list_li clearfix">

                                        <div className="item_li">
                                            <span>利息(税前):</span>
                                            <span className="sp_mt_l">{interest}</span>
                                        </div>

                                        <div className="item_li">
                                            <span>关税:</span>
                                            <span className="sp_mt_l">{amount_tariff}</span>
                                        </div>

                                    </li>

                                    <li className="list_li clearfix">

                                        <div className="item_li">
                                            <span>手续费:</span>
                                            <span className="sp_mt_l">{poundage}</span>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                            <div className="uploadArea">
                                <div className="uploadinput">
                                    {shouldShowImg}
                                    <img src={addFile} className="uploadImg" />
                                    {imputShow}
                                </div>
                                {buttonetc}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }



    }
}

UploadWaterbills.propTypes = {};
