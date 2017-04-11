import React, {PropTypes, Component} from 'react';
import { Tabs, Icon } from 'antd';
import ListInformation from './ListInformation';
import Goods from './goods';
import Invoice from './invoice';
import AttachmentInformationList from './AttachmentInformationList';
import AdvancePaymentList from './AdvancePaymentList';
import ForeignChangeInformationList from './ForeignChangeInformationList';
import GLPPayfor from './GLPPayfor';
import { message } from 'antd';

const TabPane = Tabs.TabPane;

message.config({
    top: 50,
    duration: 2,
});

class TabsList extends Component {
    tabClick(data) {
        if(data == 2 && this.props.statusForTrade < 1) {
            message.error('暂无信息！');
            return;
        } else if(data == 3 && this.props.statusForTrade < 3) {
            message.error('暂无信息！');
            return;
        } else if(data == 4 && this.props.order_type == 2 &&this.props.statusForTrade < 7) {
            message.error('暂无信息！');
            return;
        } else if(data == 4 && this.props.order_type == 1 && this.props.statusForTrade < 5) {
            message.error('暂无信息！');
            return;
        } else if(data == 5 && this.props.order_type == 1 && this.props.statusForTrade < 6) {
            message.error('暂无信息！');
            return;
        } else if(data == 5 && this.props.order_type == 2 && this.props.statusForTrade < 5) {
            message.error('暂无信息！');
            return;
        }

        this.props.updateState({activeKey:data});
    }

    render() {
        const showfloat = this.props.showfloat;
        let styleFloat = {}

        if(showfloat) {
            styleFloat = {
                display:'block'
            }
        }else {
            styleFloat = {
                display:'none'
            }
        }

        const id = this.props.id;
        const flag = this.props.flag;

        let buyment;//购汇信息
        if(this.props.order_type == 1) {
            buyment = (
                <TabPane tab={<span><Icon type="calculator" />GLP支付信息</span>} key="5">
                    <GLPPayfor {...this.props} />
                </TabPane>
            );
        }else {
            buyment = (
                <TabPane tab={<span><Icon type="calculator" />购汇信息</span>} key="5">
                    <ForeignChangeInformationList {...this.props} />
                </TabPane>
            );
        }

        return (
            <div className="tabs">
                <Tabs activeKey={this.props.activeKey || 1} onTabClick={(data)=>this.tabClick(data)}>
                    {/*融资信息*/}
                    <TabPane tab={<span><Icon type="file-text" />融资信息</span>} key="1">
                        <ListInformation {...this.props} showData='1' />
                        <Goods {...this.props} />
                        <Invoice {...this.props} />
                        <ListInformation {...this.props} showData='2' />
                        <ListInformation {...this.props} showData='3' />
                        <ListInformation {...this.props} showData='4' />
                    </TabPane>

                    {/*附件信息*/}
                    <TabPane tab={<span><Icon type="folder" />附件信息</span>} key="2">
                        <AttachmentInformationList {...this.props}/>
                    </TabPane>

                    {/*预付款*/}
                    <TabPane tab={<span><Icon type="pay-circle-o" />保证金</span>} key="3">
                        <AdvancePaymentList {...this.props} payType="AdvancePayment"/>
                    </TabPane>

                    {/*手续费*/}
                    <TabPane tab={<span><Icon type="pay-circle-o" />手续费</span>} key="4">
                        <AdvancePaymentList {...this.props} payType="Poundage"/>
                    </TabPane>

                    {/*购汇信息 内贸为glp支付*/}
                    {buyment}
                </Tabs>
                {/*//付款完成的浮层*/}
                <div className="payforconfirm" style={styleFloat}>
                    <div className="confirmToast">
                        <div className="closeproblem" onClick={()=>this.props.closePayForFloat()}>x</div>
                        <div className="confirmToast-h">付款提示</div>
                        <div className="confirmToast-b">
                            <p>付款完成前请不要关闭此窗口，完成付款后请根据你的情况点击下面的按钮：</p>
                            <p className="bold">请在新开的网上储存卡页面完成付款后在选择！</p>
                            <div className="btn-payfor">
                                <div className="btn-payfor-wrap">
                                    <div className="payfor-l-r payfor-left" onClick={()=>this.props.closeRefluah({id:id,flag:flag})}>付款遇到问题</div>
                                    <div className="payfor-l-r payfor-right" onClick={()=>this.props.closeRefluah({id:id,flag:flag})}>已经完成付款</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TabsList;

TabsList.propTypes = {};
