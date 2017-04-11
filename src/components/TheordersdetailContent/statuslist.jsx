import React, {PropTypes, Component} from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;
export default class StatusList extends Component {

    render() {
        const statusForTrade = this.props.statusForTrade || 0;
        console.log(statusForTrade,'statusForTrade');
        if(this.props.order_type == 1) {

            return (
                <div className="statuslist">
                    <Steps current={statusForTrade}>
                        <Step title="审批中"/>
                        <Step title="审批通过"/>
                        <Step title="附件已上传"/>
                        {/*<Step title="订单已确认"/>*/}
                        <Step title="支付预付款"/>
                        <Step title="预付款处理"/>
                        <Step title="支付手续费"/>
                        <Step title="手续费处理中"/>
                        <Step title="GLP支付尾款"/>
                    </Steps>
                </div>
            )

        } else {
            return (
                <div className="statuslist">
                    <Steps current={statusForTrade}>
                        <Step title="审批中"/>
                        <Step title="上传附件"/>
                        <Step title="附件已上传"/>
                        <Step title="支付预付款"/>
                        <Step title="预付款处理中"/>
                        <Step title="预付款购汇已更新"/>
                        <Step title="CI已更新"/>
                        <Step title="支付手续费"/>
                        <Step title="手续费处理中"/>
                        <Step title="尾款购汇更新"/>
                        <Step title="关税增值税更新"/>
                        <Step title="其他附件"/>
                    </Steps>
                </div>
            )
        }



    }
}

StatusList.propTypes = {};
