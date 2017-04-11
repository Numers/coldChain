import './style.css';
import React, {PropTypes, Component} from 'react';
import formatdata from 'formatdata';
import { Table } from 'antd';
import { Link } from 'dva/router';


const columns = [{
    title: '提货时间',
    //dataIndex: 'expected_delivery_time',
    key:'expected_delivery_time',
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
    key:'order_id'
}, {
    title: 'GLP合同号',
    dataIndex: 'buy_order_number',
    key:'buy_order_number'
},{
    title: 'SKU品名	',
    dataIndex: 'description',
    key:'description'
},{
    title: '数量/kg	',
    key:'weight',
    render:(data) => {
        //priceadd
        const price = formatdata({
            type:'priceadd',
            data:data.weight
        })

        return (<span className="ls-in-r">{price}</span>)
    }

},{
    title: '应付款金额',
    //dataIndex: 'amount',
    key:'amount',
    render:(data) => {
        //priceadd
        const price = formatdata({
            type:'priceadd',
            data:data.amount
        })

        return (<span className="ls-in-r">{price}</span>)
    }
},{
    title: '订单状态',
    dataIndex: 'status',
    key:'status'
},{
    title: '操作',
    key:'id',
    render: (text, record, index) => (
        <Link to={`/coldChain/pickDetail/${text.id}`}>查看详情</Link>
    ),
}];


export default class pickcenterTable extends Component {

    render() {

        const dataSource = this.props.dataSource;
        const current = this.props.current;
        const total = this.props.total;
        return (
            <div className="pickcenterTable">
                <Table columns={columns}
                       dataSource={dataSource}
                       pagination={{"total":total,"current":current}}
                       onChange={(pagination, filters, sorter)=>this.props.tableOnChange({...pagination,...filters,...sorter})}
                       scroll={{x:"950"}}
                />
            </div>
        )
    }
}

pickcenterTable.propTypes = {};
