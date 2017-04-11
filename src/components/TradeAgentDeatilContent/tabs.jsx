import React, {PropTypes, Component} from 'react';
import { Tabs, Icon } from 'antd';
import ListInformation from './ListInformation';
import Goods from './Goods';
import Invoice from './Invoice';
import InvoiceList from './InvoiceList';
import ForeignExchangeInformationList from './ForeignExchangeInformationList';
const TabPane = Tabs.TabPane;

import { message } from 'antd';

message.config({
    top: 50,
    duration: 2,
});

class TabsList extends Component {
    tabClick(data) {

        if(data == 3 && this.props.tradeStatus < 2) {
            message.error('暂无信息！');
            return;
        }

        this.props.updateState({activeKey:data});
    }

    render() {
        return (
            <div className="tabs">
                <Tabs defaultActiveKey="1" activeKey={this.props.activeKey || 1} onTabClick={(data)=>this.tabClick(data)}>

                    {/*融资信息*/}
                    <TabPane tab={<span><Icon type="file-text" />采购信息</span>} key="1">
                        <ListInformation {...this.props} showData='1' />
                        <Goods {...this.props} />
                        <Invoice {...this.props} />
                        <ListInformation {...this.props} showData='2' />
                        <ListInformation {...this.props} showData='3' />
                    </TabPane>

                    {/*附件信息*/}
                    <TabPane tab={<span><Icon type="folder" />附件信息</span>} key="2">
                        <InvoiceList {...this.props} />
                    </TabPane>

                    {/*购汇信息*/}
                    <TabPane tab={<span><Icon type="calculator" />购汇信息</span>} key="3">
                        <ForeignExchangeInformationList {...this.props} />
                    </TabPane>

                </Tabs>
            </div>
        )

    }
}

export default TabsList;

TabsList.propTypes = {};
