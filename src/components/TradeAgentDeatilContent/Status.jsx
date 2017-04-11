import React, {PropTypes, Component} from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;
export default class StatusList extends Component {

    render() {

        const tradeStatus = this.props.tradeStatus || '0';
        return (
            <div className="statuslist">
                <Steps current={tradeStatus} >
                    <Step title="上传附件"/>
                    <Step title="订单确认"/>
                    <Step title="预付款购汇"/>
                    <Step title="CI信息填写"/>
                    <Step title="CI信息更新"/>
                    <Step title="尾款购汇"/>
                    <Step title="关税增值税"/>
                    <Step title="其它附件"/>
                    <Step title="已更新附件"/>
                </Steps>
            </div>
        )

    }
}

StatusList.propTypes = {};
