import React, {PropTypes, Component} from 'react';
import {Table} from 'antd';
import formatdata from 'formatdata';

export default class TableForAll extends Component {
    onPChange(data) {
        const props = this.props;
        this.props.pageAll({
            page:data.current,
            per : props.per,
            contract_no:props.contract_no,
            pi_no:props.pi_no,
            order_type:props.order_type
        });
    }

    render() {
        const props = this.props;
        const columns = [{
                title: '选择',
                width: 50,
                key: 'ingsksj',
                fixed: 'left',
                render:(data)=> {
                    return (
                        <input type="radio" style={{width:"18px",height:"18px"}} name="show" onClick={()=>props.renderSmallList({
                            ...data,
                            refinance_apply_id:data.id
                        })}/>
                    )
                }
            },{
                title: '购销合同号',
                dataIndex: 'contract_no',
                key: 'contract_no',
            },{
                title: '申请单编号',
                dataIndex: 'refinance_order_no',
                key: 'refinance_order_no',
            },{
                title: '申请日期',
                dataIndex: 'apply_time',
                key: 'apply_time',
            },{
                title: '采购（PI）号',
                dataIndex: 'pi_no',
                key: 'pi_no',
            },{
                title: '贸易类型',
                dataIndex: 'order_type_name',
                key: 'order_type_name',
            },{
                title: '币种',
                dataIndex: 'money_code',
                key: 'money_code',
            },{
                title: '合同金额(外币)',
                dataIndex: 'goods_total_price',
                key: 'goods_total_price',
                render:(data)=>{
                    const goods_total_price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span className="inline-b-ls inline-b-ls-lss">{goods_total_price}</span>
                    )
                }
            },{
                title: '保证金(外币)',
                dataIndex: 'bond',
                key: 'bond',
                render:(data)=>{
                    const bond = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span className="inline-b-ls inline-b-ls-lss">{bond}</span>
                    )
                }
            },{
                title: '融资货值(外币)',
                dataIndex: 'refinance_total_price',
                key: 'refinance_total_price',
                render:(data)=>{
                    const refinance_total_price = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span className="inline-b-ls inline-b-ls-lss">{refinance_total_price}</span>
                    )
                }
            },{
                title: '关税',
                dataIndex: 'tariff',
                key: 'tariff',
                render:(data)=>{
                    const tariff = formatdata({
                        type:'priceadd',
                        data:data
                    });

                    return (
                        <span className="inline-b-ls inline-b-ls-cl">{tariff}</span>
                    )
                }
            },{
                title: '进口增值税',
                dataIndex: 'import_vat',
                key: 'import_vat',
                render:(data)=>{
                    const import_vat = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span className="inline-b-ls inline-b-ls-cl">{import_vat}</span>
                    )
                }
            },{
                title: '货值手续费',
                dataIndex: 'poundage_cn',
                key: 'poundage_cn',
                render:(data)=>{
                    const poundage_cn = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span className="inline-b-ls inline-b-ls-cl">{poundage_cn}</span>
                    )
                }
            },{
                title: '税费手续费',
                dataIndex: 'tariff_import_vat',
                key: 'tariff_import_vat',
                render:(data)=>{
                    const tariff_import_vat = formatdata({
                        type:'priceadd',
                        data:data
                    })

                    return (
                        <span className="inline-b-ls inline-b-ls-cl">{tariff_import_vat}</span>
                    )
                }
            },{
                title: '订单状态',
                dataIndex: 'flag_str',
                key: 'flag',
                width:120,
                fixed: 'right',
            },{
                title: '操作',
                key: 'operate',
                fixed: 'right',
                width:120,
                render:(data) => {

                    const renderHTML = formatdata({
                        type:'operateInTheOrders',
                        data:data
                    });

                    return renderHTML;
                }
            }];

        const dataSource = this.props.dataSourceBig;
        return (
            <div className="table-for-all">
                <Table columns={columns} pagination={{"total":this.props.totalAll,"current":this.props.pageBig}} dataSource={dataSource}  onChange={(pagination, filters, sorter)=>this.onPChange({...pagination,...filters,...sorter})} scroll={{ x: 1500 }}/>
            </div>
        )
    }

}

TableForAll.propTypes = {};
