import React, {PropTypes, Component} from 'react';
import { Row , Col , Button } from 'antd';
import formatdata from 'formatdata';

class AdvancePayment extends Component {
    payfor() {
        let finance_payment_info;
        let payload;
        const money_code = this.props.finance_head_info && this.props.finance_head_info.money_code || 'CYH';
        if(this.props.payType == 'AdvancePayment') {
            finance_payment_info = this.props.finance_payment_info && this.props.finance_payment_info['1'];
            payload = {
                refinance_apply_id:this.props.id,
                user_id:finance_payment_info.uid,
                order_money:finance_payment_info.bond_cn,
                payment_type:'1',
                money_code:money_code
            };
        }else if(this.props.payType == 'Poundage') {

            finance_payment_info = this.props.finance_payment_info && this.props.finance_payment_info['2'];
            //如果为手续费的特殊情况
            let order_money;
            if(finance_payment_info.special) {
                order_money = finance_payment_info.poundage_cn + finance_payment_info.total_poundage_cn;
            }else {
                order_money = finance_payment_info.poundage_cn;
            }

            payload = {
                refinance_apply_id:this.props.id,
                user_id:finance_payment_info.uid,
                order_money:order_money,
                payment_type:'2',
                money_code:money_code
            };
        }

        this.props.payforMoney(payload);
    }

    submitUpload() {

        let payload;
        const file_url = formatdata({
            type:'file_url',
            data:this.props.upLoadImgList
        });

        if(this.props.payType == 'AdvancePayment') {
            payload = {
                file_type:7,
                file_info:file_url,
                refinance_apply_id:this.props.id
            };
        }else if(this.props.payType == 'Poundage') {
            payload = {
                file_type:8,
                file_info:file_url,
                refinance_apply_id:this.props.id
            };
        }

        this.props.uploadSubmit(payload);
    }

    render() {

        const finance_payment_infoSingle = this.props.finance_payment_infoSingle;
        const file = finance_payment_infoSingle.file && finance_payment_infoSingle.file[0] || {};
        const file_url = file.file_url || [];
        const upLoadImgList = this.props.upLoadImgList || [];
        const money_code = this.props.finance_head_info && this.props.finance_head_info.money_code || 'CYH';

        //已有水单渲染
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

        //上传水单的实时渲染
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

        let file_url_style = {}; //图片渲染的style
        let uploadImgUrl_style = {};//上传图片渲染的style
        let payformentStyle = {};//支付的style
        let chooseShouldRenderPayfor; //是否需要渲染支付
        let waterls ;//选择渲染水单图片还是上传水单
        let payformoney; //金额的前端展示
        let payformoneysp;
        let showMoney;
        let poundagemoney;
        //如果没有图片 整块图片不渲染
        if(!file_url || !file_url.length) {
            file_url_style = {
                display:"none"
            }
        } else {
            file_url_style = {
                display:"block"
            }
        }

        //如果没有上传图片列表 整块图片不渲染
        if(!upLoadImgList || !upLoadImgList.length) {
            uploadImgUrl_style = {
                display:"none"
            }
        } else {
            uploadImgUrl_style = {
                display:"block"
            }
        }

        //水单照片渲染
        const renderWater = (
            <div className="formWrapP clearfix" style={file_url_style}>
                <div className="header-message">
                    水单图片
                </div>
                <Row>
                    {imgList}
                </Row>
            </div>
        );

        //上传的水单照片渲染
        const renderUploadWater = (
            <div className="formWrapP clearfix" style={uploadImgUrl_style}>
                <div className="header-message">
                    水单图片
                </div>
                <Row gutter={15}>
                    {upLoadImgListImg}
                </Row>
                <div className="btn-wrap-img">
                    <Button type="primary" onClick={()=>{this.submitUpload()}} >提交</Button>
                </div>
            </div>
        );


        //支付手段
        const renderUploadAndPayment = (
            <div className="payforbtn clearfix">
                <div className="input-file input-sp">
                    上传水单
                    <input className="input-file-file" type="file" multiple onChange={(e) => this.props.uploadImg(e)}/>
                </div>
                <div className="payfr" onClick={() => this.payfor()}>
                    在线支付
                </div>
            </div>
        );



        /*
         *
         * 相应的展示问题
         * */

        //如果为预付款
        if(this.props.payType == 'AdvancePayment') {

            //预付款外贸
            if(this.props.order_type == 2) {
                if(this.props.statusForTrade > 3) {
                    payformentStyle = {
                        display:'block'
                    }
                    waterls = renderWater;
                } else {
                    payformentStyle = {
                        display:'none'
                    }
                    waterls = renderUploadWater;
                }

                if(this.props.flag == 4) {
                    chooseShouldRenderPayfor = renderUploadAndPayment;
                }

                if(finance_payment_infoSingle.special) {
                    const price1 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.total_bond_cn
                    });

                    const price2 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.total_bond
                    });

                    payformoneysp = ((
                        <Row>
                            <Col xs={24} sm={6} md={6} lg={6}>
                                <div className="list-left">
                                    应支付保证金：
                                </div>
                            </Col>
                            <Col xs={24} sm={18} md={18} lg={18}>
                                <div className="list-right">
                                    {`￥${price1}( ${money_code} ${price2} )`}
                                </div>
                            </Col>
                        </Row>
                    ));
                }else {
                    payformoneysp = '';
                }

                const price_bond_cn = formatdata({
                    type:'priceadd',
                    data:finance_payment_infoSingle && finance_payment_infoSingle.bond_cn || 0
                });

                const price_bond = formatdata({
                    type:'priceadd',
                    data:finance_payment_infoSingle && finance_payment_infoSingle.bond || 0
                });

                payformoney = `￥${price_bond_cn}( ${money_code} ${price_bond} )`;


            }else if(this.props.order_type == 1) {
                //预付款内贸
                if(this.props.statusForTrade > 3) {
                    payformentStyle = {
                        display:'block'
                    }
                    waterls = renderWater;
                } else {
                    payformentStyle = {
                        display:'none'
                    }
                    waterls = renderUploadWater;
                }

                if(this.props.flag == 4) {
                    chooseShouldRenderPayfor = renderUploadAndPayment;
                }

                if(finance_payment_infoSingle.special) {
                    const price1 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.total_bond_cn
                    });

                    payformoneysp = ((
                        <Row>
                            <Col xs={24} sm={6} md={6} lg={6}>
                                <div className="list-left">
                                    应支付保证金：
                                </div>
                            </Col>
                            <Col xs={24} sm={18} md={18} lg={18}>
                                <div className="list-right">
                                    {`￥${price1}`}
                                </div>
                            </Col>
                        </Row>
                    ));
                }else {
                    payformoneysp = '';
                }

                const price_bond_cns = formatdata({
                    type:'priceadd',
                    data:finance_payment_infoSingle && finance_payment_infoSingle.bond_cn || 0
                });

                payformoney = `￥${price_bond_cns}`;

            }


        }//如果为手续费
        else if(this.props.payType == 'Poundage') {
            if(this.props.order_type == 2) {
                //外贸
                if(this.props.statusForTrade > 7) {
                    payformentStyle = {
                        display:'block'
                    }
                    waterls = renderWater;
                } else {
                    payformentStyle = {
                        display:'none'
                    }
                    waterls = renderUploadWater;
                }

                if(this.props.flag == 8) {
                    chooseShouldRenderPayfor = renderUploadAndPayment;
                }

                if(this.props.statusForTrade>=10) {
                    poundagemoney = (<div className="formWrapP" style={payformentStyle}>
                                        <div className="header-message">关税增值税手续费</div>
                                        <div className="message-bd">关税增值税手续费金额：¥{finance_payment_infoSingle.tariff_cn}  （手续费分摊到提货商品中）</div>
                                    </div>);
                }

                if(finance_payment_infoSingle.special) {
                    const price1 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.total_poundage_cn
                    });

                    payformoneysp = ((
                        <Row>
                            <Col xs={24} sm={6} md={6} lg={6}>
                                <div className="list-left">
                                    补支付保证金：
                                </div>
                            </Col>
                            <Col xs={24} sm={18} md={18} lg={18}>
                                <div className="list-right">
                                    {`￥${price1}`}
                                </div>
                            </Col>
                        </Row>
                    ));

                }else {
                    payformoneysp = '';
                }

                const pricels = formatdata({
                    type:'priceadd',
                    data:finance_payment_infoSingle.poundage_cn
                });

                const pricels2 = formatdata({
                    type:'priceadd',
                    data:finance_payment_infoSingle.poundage
                });

                payformoney = `￥${pricels}( ${money_code} ${pricels2} )`

            }else if(this.props.order_type == 1) {
                //内贸
                if(this.props.statusForTrade > 6) {
                    payformentStyle = {
                        display:'block'
                    }
                    waterls = renderWater;
                } else {
                    payformentStyle = {
                        display:'none'
                    }
                    waterls = renderUploadWater;
                }

                if(this.props.flag == 9) {

                    chooseShouldRenderPayfor = renderUploadAndPayment;
                }

                if(finance_payment_infoSingle.special) {

                    const total_poundage_cn = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.total_poundage_cn
                    });

                    payformoneysp = ((
                        <Row>
                            <Col xs={24} sm={6} md={6} lg={6}>
                                <div className="list-left">
                                    补支付保证金:
                                </div>
                            </Col>
                            <Col xs={24} sm={18} md={18} lg={18}>
                                <div className="list-right">
                                    {`￥${total_poundage_cn}`}
                                </div>
                            </Col>
                        </Row>
                    ));
                }else {
                    payformoneysp = '';
                }

                const pricels = formatdata({
                    type:'priceadd',
                    data:finance_payment_infoSingle.poundage_cn
                });

                payformoney = `￥${pricels}`
            }

        }


        /*
        *
        * 订单融资上面白色的展示
        * */

        if(this.props.order_type == 1) {
            //内贸
            if(finance_payment_infoSingle.refinance_order_no) {
                if(finance_payment_infoSingle.payment_type == 1) {

                    const price1 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.refinance_total_price_ci
                    });

                    const price2 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.bond_cn
                    });

                    //预付款
                    showMoney = (
                        <div className="header-message message-sp">
                            根据{finance_payment_infoSingle.refinance_order_no}订单融资{price1}元计算出支付保证金金额为{price2}元
                        </div>
                    );

                }else if(finance_payment_infoSingle.payment_type == 2){
                    //手续费
                    let money;
                    let money1;
                    if(finance_payment_infoSingle.special) {
                        money1 = finance_payment_infoSingle.refinance_total_price_ci;
                        const moneyadd = Number(finance_payment_infoSingle.poundage_cn) + Number(finance_payment_infoSingle.total_poundage_cn);
                        money = formatdata({
                            type:'getFloat',
                            data: {
                                number: moneyadd,
                                n: 2
                            }
                        });
                    }else {
                        money1 = finance_payment_infoSingle.refinance_total_price_ci;
                        money = finance_payment_infoSingle.poundage_cn;
                    }

                    const price1 = formatdata({
                        type:'priceadd',
                        data:money1
                    });

                    const price2 = formatdata({
                        type:'priceadd',
                        data:money
                    });

                    showMoney = (
                        <div className="header-message message-sp">
                            根据{finance_payment_infoSingle.refinance_order_no}订单融资{price1}元计算出支付总金额为{price2}元
                        </div>
                    );
                }
            }else {
                showMoney = '';
            }

        }else if(this.props.order_type == 2) {
            //外贸
            if(finance_payment_infoSingle.refinance_order_no) {
                if(finance_payment_infoSingle.payment_type == 1) {

                    const price1 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.refinance_total_price_ci
                    });

                    const price2 = formatdata({
                        type:'priceadd',
                        data:finance_payment_infoSingle.bond_cn
                    });

                    //预付款
                    showMoney = (
                        <div className="header-message message-sp">
                            根据{finance_payment_infoSingle.refinance_order_no}订单融资{finance_payment_infoSingle.money_code} {price1} 以及实时汇率计算出保证金为人民币{price2}元
                        </div>
                    );
                }else if(finance_payment_infoSingle.payment_type == 2) {
                    //手续费
                    let money1;
                    let money2;
                    if(finance_payment_infoSingle.special) {
                        money1 = finance_payment_infoSingle.refinance_total_price_ci;
                        const moneyadd = Number(finance_payment_infoSingle.poundage_cn) + Number(finance_payment_infoSingle.total_poundage_cn);
                        money2 = formatdata({
                            type:'getFloat',
                            data: {
                                number: moneyadd,
                                n: 2
                            }
                        });
                    } else {
                        money1 = finance_payment_infoSingle.refinance_total_price_ci;
                        money2 = finance_payment_infoSingle.poundage_cn;
                    }

                    const price1 = formatdata({
                        type:'priceadd',
                        data:money1
                    });

                    const price2 = formatdata({
                        type:'priceadd',
                        data:money2
                    });

                    showMoney = (
                        <div className="header-message message-sp">
                            根据{finance_payment_infoSingle.refinance_order_no}订单融资{finance_payment_infoSingle.money_code} {price1} 以及实时汇率计算出总金额为人民币{price2}元
                        </div>
                    );

                }


            }else {
                showMoney = '';
            }
        }

        return (
            <div className="listpart">

                {showMoney}

                <div className="formWrapP">
                    <Row>
                        <Col xs={24} sm={24} md={15} lg={15} >
                            <Row>
                                <Col xs={24} sm={6} md={6} lg={6}>
                                    <div className="list-left">
                                        收款人开户行：
                                    </div>
                                </Col>
                                <Col xs={24} sm={18} md={18} lg={18}>
                                    <div className="list-right">
                                        {finance_payment_infoSingle.beneficiary_bank}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={6} md={6} lg={6}>
                                    <div className="list-left">
                                        收款人账号：
                                    </div>
                                </Col>
                                <Col xs={24} sm={18} md={18} lg={18}>
                                    <div className="list-right">
                                        {finance_payment_infoSingle.beneficiary_account}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={6} md={6} lg={6}>
                                    <div className="list-left">
                                        收款人户名：
                                    </div>
                                </Col>
                                <Col xs={24} sm={18} md={18} lg={18}>
                                    <div className="list-right">
                                        {finance_payment_infoSingle.beneficiary_user}
                                    </div>
                                </Col>
                            </Row>
                            {payformoneysp?payformoneysp:''}
                            <Row>
                                <Col xs={24} sm={6} md={6} lg={6}>
                                    <div className="list-left">
                                        {finance_payment_infoSingle.payment_type==1?"本次支付保证金：":"支付手续费额："}
                                    </div>
                                </Col>
                                <Col xs={24} sm={18} md={18} lg={18}>
                                    <div className="list-right">
                                        {payformoney}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={0} sm={0} md={9} lg={9} >
                            <div className="tips">
                                <div className="tips-wrap">
                                    <div className="tips-text">如果您开通了第三方支付，</div>
                                    <div className="tips-text">请选择在线支付；</div>
                                    <div className="tips-text">如果您开通在线支付功能，</div>
                                    <div className="tips-text">请联系客服 021-61053999</div>
                                    <div className="tips-text">如果您线下转账支付，请上传银行水单。</div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {chooseShouldRenderPayfor}
                </div>
                <div className="payforrefef">
                    {waterls}
                    <div className="formWrapP" style={payformentStyle}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col xs={24} sm={6} md={6} lg={4}>
                                        <div className="list-left">
                                            支付状态：
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={18} md={18} lg={18}>
                                        <div className="list-right right-sp">
                                            已支付
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={24} sm={6} md={6} lg={4}>
                                        <div className="list-left">
                                            支付时间：
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={18} md={18} lg={18}>
                                        <div className="list-right right-sp">
                                            {finance_payment_infoSingle.payment_time}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={24} sm={6} md={6} lg={4}>
                                        <div className="list-left">
                                            支付交易号：
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={18} md={18} lg={18}>
                                        <div className="list-right right-sp">
                                            {finance_payment_infoSingle.payment_no}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={24} sm={6} md={6} lg={4}>
                                        <div className="list-left">
                                            付款银行：
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={18} md={18} lg={18}>
                                        <div className="list-right right-sp">
                                            {finance_payment_infoSingle.payment_bank}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={24} sm={6} md={6} lg={4}>
                                        <div className="list-left">
                                            银行支付流水：
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={18} md={18} lg={18}>
                                        <div className="list-right right-sp">
                                            {finance_payment_infoSingle.payment_code}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                {poundagemoney}
            </div>
        )
    }

}


AdvancePayment.propTypes = {};

export default AdvancePayment;