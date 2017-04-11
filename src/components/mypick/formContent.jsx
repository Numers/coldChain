import { Table, Icon } from 'antd';
import React, {PropTypes, Component} from 'react';
import { Input } from 'antd';

export default class formContent extends Component {
    render() {
        const getQuantity = (payload) => {
            this.props.getQuantity(payload)
        };
        const data = this.props.foodListData;

        const columns = [{
            title: 'PI号',
            dataIndex: 'batch',
            key: 'batch',
            width:100,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        }, {
            title: 'GLP合同号',
            dataIndex: 'buy_order_number',
            key: 'buy_order_number',
            width:100,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        }, {
            title: '货物名称',
            dataIndex: 'description',
            key: 'description',
            width:220,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        }, {
            title: '厂号',
            dataIndex: 'producer',
            key: 'producer',
            width:90,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        },{
            title: '规格',
            dataIndex: 'specifications',
            key: 'specifications',
            width:90,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        },{
            title: '仓库',
            dataIndex: 'warehouse_name',
            key: 'warehouse_name',
            width:220,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        },{
            title: '可提( kg )',
            dataIndex: 'weight_unit',
            key: 'weight_unit',
            width:90,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        },{
            title: '可提( 件数 )',
            dataIndex: 'quantity',
            key: 'quantity',
            width:90,
            render:(data) => {
                const render = data || '/'
                return (
                    <span>{render}</span>
                );
            }
        },{
            title: '提货( kg )',
            key: 'action',
            width:90,
            render: (text, record, index) => (
                <Input type="text" style={{height:"28px",width:'70px'}} size='small' scroll={{x:1000}} onChange={(e)=>getQuantity({text, record, index , number:e.target.value})}/>
            ),
        }];

        return (
            <Table columns={columns} dataSource={data} pagination={false}/>
        )
    }
}