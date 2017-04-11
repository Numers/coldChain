import React from 'react'
import {Table} from 'antd'
import formatdata from 'formatdata';
import { Link } from 'dva/router';

const columns = [{
    title: '提货时间',
    //dataIndex: 'expected_delivery_time',
    key:'expected_delivery_time',
    width:20,
    render:(data)=>{
        //priceadd
        const time = formatdata({
            type:'YYMMDD',
            data:data.expected_delivery_time
        })

        return (<span>{time}</span>)
    }
}, {
    title: '提货单号',
    dataIndex: 'order_id',
    key:'order_id',
    width:45,
}, {
    title: 'GLP合同号',
    dataIndex: 'buy_order_number',
    key:'buy_order_number',
    width:30,
},{
    title: 'SKU品名	',
    dataIndex: 'description',
    key:'description',
    width:30,
},{
    title: '数量/kg	',
    dataIndex: 'weight',
    key:'weight',
    width:20,
},{
    title: '应付款金额',
    //dataIndex: 'amount',
    key:'amount',
    width:30,
    render:(data)=>{
        //priceadd
        const price = formatdata({
            type:'priceadd',
            data:data.amount
        })

        return (<span>{price}</span>)
    }
},{
    title: '订单状态',
    dataIndex: 'status',
    key:'status',
    width:30,
},{
    title: '操作',
    key:'id',
    width:20,
    render: (text, record, index) => (
        <Link to={`/coldChain/pickDetail/${text.id}`}>查看详情</Link>
    ),
}];
export default class PickupOrderTable extends React.Component
{
    componentDidMount()
    {
        if(this.props.dataSourceForPickOrderTable === undefined) {
            this.props.renderPickOrderTable({});
        }
    }

    render()
    {
        return (<Table columns={columns}
                       pagination={{"total":this.props.total,"current":this.props.current}}
                       dataSource={this.props.dataSourceForPickOrderTable}
                       onChange={(pagination, filters, sorter)=>this.props.tableOnChange({...pagination,...filters,...sorter})}>
                </Table>);
    }
}
