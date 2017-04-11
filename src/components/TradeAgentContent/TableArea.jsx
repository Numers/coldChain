import './style.css';
import React, {PropTypes, Component} from 'react';
import { Table } from 'antd';
import formatdata from 'formatdata';

class TableArea extends Component {

    tablequeryrender(data) {
        const page = data.current;
        const pi_no = this.props.pi_no;
        const order_type = this.props.order_type;
        const per = this.props.per;

        this.props.queryrender({
            page,
            pi_no,
            order_type,
            per
        });

    }

    render() {
        const columns = [{
            title: '申请日期',
            width: 100,
            dataIndex: 'apply_time',
            key: 'apply_time',
            fixed: 'left'
        },{
            title: 'PI/CI编号',
            dataIndex: 'pi_no',
            key: 'pi_no',
        },{
            title: '客户名称',
            dataIndex: 'customer_name',
            key: 'customer_name',
        },{
            title: '货款总额',
            dataIndex: 'goods_total_price',
            key: 'goods_total_price',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span className="font-r-l">{price}</span>
                )
            }
        },{
            title: '首付',
            dataIndex: 'bond',
            key: 'bond',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span className="font-r-l">{price}</span>
                )
            }
        },{
            title: '尾款',
            dataIndex: 'retainage',
            key: 'retainage',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span className="font-r-l">{price}</span>
                )
            }
        },{
            title: '币种',
            dataIndex: 'money_code',
            key: 'money_code',
        },{
            title: '关税',
            dataIndex: 'tariff',
            key: 'tariff',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span className="font-r-l">{price}</span>
                )
            }
        },{
            title: '增值税',
            dataIndex: 'import_vat',
            key: 'import_vat',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span className="font-r-l">{price}</span>
                )
            }
        },{
            title: '订单状态',
            dataIndex: 'flag_str',
            key: 'flag_str',
        },{
            title: '操作',
            width: 80,
            key: 'operate',
            fixed: 'right',
            render:(data) => {

                const renderData = formatdata({
                    type:'tradeTable',
                    data:data
                });

                return (
                    <span>
                        {renderData}
                    </span>
                )

            }
        }];

        const dataSource = this.props.datasource;

        return (
            <div className="table">
                <Table columns={columns} dataSource={dataSource} pagination={{"total":this.props.total,"current":this.props.current}} scroll={{ x: 1100 }} onChange={(pagination, filters, sorter)=>this.tablequeryrender({...pagination,...filters,...sorter})}/>
            </div>
        )
    }
}


export default TableArea;

TableArea.propTypes = {};
