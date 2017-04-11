import React, {PropTypes, Component} from 'react';

import { Steps } from 'antd';

export default class StepsContent extends Component {

    render() {
        const Step = Steps.Step;
        const status = this.props.payfordata.status;
        let StepList;
        let current;

        if(status == 1) {
            current = 0;
        } else if(status == 3) {
            current = status-2;
        } else if(status == 5) {
            current = status-3;
        } else if(status == 6) {
            current = 6
        }


        if(status!=2 && status!=4) {
            StepList = (
                <Steps current={current} status="process">

                    <Step title="仓库分拣中" />
                    <Step title="抄码完成 等待付款"  />
                    <Step title="付款完成 等待确认"  />
                    <Step title="付款成功 出库完成" />

                </Steps>
            )
        }else if(status == 2) {
            StepList = (
                <Steps current={3}>

                    <Step title="仓库分拣中"  />
                    <Step title="订单已取消"  />

                </Steps>
            )
        }else if(status == 4) {
            StepList = (
                <Steps current={3}>

                    <Step title="仓库分拣中"  />
                    <Step title="抄码完成 等待付款"/>
                    <Step title="订单已取消"  />

                </Steps>
            )
        }

        return (
            <div className="statelist">
                <div className="statelistWrap">
                    {StepList}
                </div>
            </div>
        )
    }
}

StepsContent.propTypes = {};
