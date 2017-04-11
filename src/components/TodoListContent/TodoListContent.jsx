import React, {PropTypes, Component} from 'react';
import './style.css';
import FinancingOrder from './FinancingOrder/FinancingOrder';
import PickupOrder from './PickupOrder/PickupOrder';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
export default class TodoListContent extends Component {

    callback(key) {
        console.log(key);
    }
    render() {
        const financingOrderTotal = (<div>融资订单<span className="TabAmount">({this.props.totalAll})</span></div>);
        const pickupOrderTotal = (<div>提货订单<span className="TabAmount">({this.props.total})</span></div>);
        return (
            <div className="todoListContentClass">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab={financingOrderTotal} key="1">
                        <FinancingOrder {...this.props}/>
                    </TabPane>
                    <TabPane tab={pickupOrderTotal} key="2">
                        <PickupOrder {...this.props}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

TodoListContent.propTypes = {};