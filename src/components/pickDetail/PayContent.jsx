import React, {PropTypes, Component} from 'react';
import formatdata from 'formatdata';
export default class DriverInformation extends Component {

    render() {

        const payfordata = this.props.payfordata;
        const pay_record_info = payfordata && payfordata.pay_record_info || {};
        const status = payfordata && payfordata.status || '';
        const showPayForFloat = this.props.showPayForFloat;
        let   leftMes;
        let   gotopay;
        let   payforFloatStyle;

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

        if(status == 3 && showPayForFloat) {
            payforFloatStyle = {display:'block'}
        }else {
            payforFloatStyle = {display:'none'}
        }

        if(status == 3) {
            gotopay = (
                <div className="gotopay" onClick={()=>this.props.gotopay(payfordata)}>
                    前去支付
                </div>
            );
        }else {
            gotopay = "";
        }

        if(status && status==5) {
            leftMes = (
                <ul>
                    <li>
                        <div className="mess_left">支付状态:</div>
                        <div className="mess_right">
                            <span style={{"color":"green"}}>已支付</span>
                        </div>
                    </li>
                    <li>
                        <div className="mess_left">支付信息:</div>
                        <div className="mess_right">
                            <span style={{"color":"green"}}>待确认</span>
                        </div>
                    </li>
                </ul>
            );
        }else if(status && status==6) {
            leftMes = (
                <ul>
                    <li>
                        <div className="mess_left">支付状态:</div>
                        <div className="mess_right">
                            <span style={{"color":"green"}}>已支付</span>
                        </div>
                    </li>
                    <li>
                        <div className="mess_left">支付时间:</div>
                        <div className="mess_right">
                            {pay_record_info.trade_date}
                        </div>
                    </li>
                    <li>
                        <div className="mess_left">支付交易号:</div>
                        <div className="mess_right">
                            {pay_record_info.inner_trade_no}
                        </div>
                    </li>
                    <li>
                        <div className="mess_left">付款银行:</div>
                        <div className="mess_right">
                            {pay_record_info.pay_bank}
                        </div>
                    </li>
                    <li>
                        <div className="mess_left">银行支付流水:</div>
                        <div className="mess_right">
                            {pay_record_info.bank_trade_no}
                        </div>
                    </li>
                </ul>
            );
        }else {
            leftMes = ''
        }

        if(payfordata.pay_available && status>=3) {
            return (
                <div className="CargoInformationContent">

                    <div className="CargoInformationContentWrap">
                        <div className="CargoInformationheader">
                            支付信息
                        </div>
                        <div className="CargoInformationbody">
                            <div className="CargoInformationbodywrap">
                                <div className="payformess clearfix">
                                    {leftMes}
                                    <ul>
                                        <li>
                                            <div className="mess_left">收款人开户行:</div>
                                            <div className="mess_right">{payfordata.bank_name}</div>
                                        </li>
                                        <li>
                                            <div className="mess_left">收款人账号:</div>
                                            <div className="mess_right">{payfordata.bank_number}</div>
                                        </li>
                                        <li>
                                            <div className="mess_left">收款人户名:</div>
                                            <div className="mess_right">{payfordata.bank_full_name}</div>
                                        </li>
                                        <li>
                                            <div className="mess_left">付款金额:</div>
                                            <div className="mess_right">
                                                <div className="color_sp">
                                                    ¥{amount} ({fea}$)
                                                </div>
                                                <div className="check_detail" onClick={()=>this.props.showDetail(payfordata.number)}>查看明细</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="mess_left">货款:</div>
                                            <div className="mess_right">{load}</div>
                                        </li>
                                        <li>
                                            <div className="mess_left">利息(税前):</div>
                                            <div className="mess_right">{tax}</div>
                                        </li>
                                        <li>
                                            <div className="mess_left">销项增值税:</div>
                                            <div className="mess_right">{interest}</div>
                                        </li>
                                        <li>
                                            <div className="mess_left">关税:</div>
                                            <div className="mess_right">{amount_tariff}</div>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                    {gotopay}

                    <div className="payforconfirm" style={payforFloatStyle}>
                        <div className="confirmToast">
                            <div className="closeproblem" onClick={()=>this.props.closePayForFloat()}>x</div>
                            <div className="confirmToast-h">付款提示</div>
                            <div className="confirmToast-b">
                                <p>付款完成前请不要关闭此窗口，完成付款后请根据你的情况点击下面的按钮：</p>
                                <p className="bold">请在新开的网上储存卡页面完成付款后在选择！</p>
                                <div className="btn-payfor">
                                    <div className="btn-payfor-wrap">
                                        <div className="payfor-l-r payfor-left" onClick={()=>this.props.closePayForFloat()}>付款遇到问题</div>
                                        <div className="payfor-l-r payfor-right" onClick={()=>this.props.closePayForFloat()}>已经完成付款</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div className="CargoInformationContent">

                </div>
            )
        }

    }
}

DriverInformation.propTypes = {};
