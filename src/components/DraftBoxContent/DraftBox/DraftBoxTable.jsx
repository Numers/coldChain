import React from 'react'
import {Table} from 'antd'
import formatdata from 'formatdata';
import '../style.css';
import { Row , Col , Button} from 'antd';

export default class DraftBoxTable extends React.Component {
    // onTableChange(data) {
    //     const props = this.props;
    //     this.props.tableOnChange({
    //         page:data.current,
    //         per : props.per,
    //         contract_no:props.contract_no,
    //         pi_no:props.pi_no,
    //         order_type:props.order_type
    //     });
    //
    // }

    edit(data) {
        const datanew = Object.assign({},data);
        const datanewStr = JSON.stringify(datanew);
        localStorage.setItem('newfinancing',datanewStr);
        this.props.goto({
            pathname:'/coldChain/generationofmining',
            query:{
                order_type:data.order_type_id,
                id:data.id,
                from:'draftbox'
            }
        });
    }

    onDelete(recordId,index)
    {
        const param = {
            ...this.props,
            recordId,
            index,
        }
        this.props.deleteRow(param);
    }

    render() {
        // const columns = [{
        //     title: '购销合同号',
        //     dataIndex: 'contract_no',
        //     key: 'contract_no',
        // },{
        //     title: '申请单编号',
        //     dataIndex: 'refinance_order_no',
        //     key: 'refinance_order_no',
        // },{
        //     title: '申请日期',
        //     dataIndex: 'apply_time',
        //     key: 'apply_time',
        // },{
        //     title: '采购（PI）号',
        //     dataIndex: 'pi_no',
        //     key: 'pi_no',
        // },{
        //     title: '贸易类型',
        //     dataIndex: 'order_type_name',
        //     key: 'order_type_name',
        // },{
        //     title: '币种',
        //     dataIndex: 'money_code',
        //     key: 'money_code',
        // },{
        //     title: '合同金额(外币)',
        //     dataIndex: 'goods_total_price',
        //     key: 'goods_total_price',
        //     render:(data)=>{
        //         const goods_total_price = formatdata({
        //             type:'priceadd',
        //             data:data
        //         })
        //
        //         return (
        //             <span className="inline-b-ls">{goods_total_price}</span>
        //         )
        //     }
        // },{
        //     title: '预付款(外币)',
        //     dataIndex: 'bond',
        //     key: 'bond',
        //     render:(data)=>{
        //         const bond = formatdata({
        //             type:'priceadd',
        //             data:data
        //         })
        //
        //         return (
        //             <span className="inline-b-ls">{bond}</span>
        //         )
        //     }
        // },{
        //     title: '融资货值(外币)',
        //     dataIndex: 'refinance_total_price',
        //     key: 'refinance_total_price',
        //     render:(data)=>{
        //         const refinance_total_price = formatdata({
        //             type:'priceadd',
        //             data:data
        //         })
        //
        //         return (
        //             <span className="inline-b-ls">{refinance_total_price}</span>
        //         )
        //     }
        // },{
        //     title: '关税',
        //     dataIndex: 'tariff',
        //     key: 'tariff',
        //     render:(data)=>{
        //         const tariff = formatdata({
        //             type:'priceadd',
        //             data:data
        //         });
        //
        //         return (
        //             <span className="inline-b-ls">{tariff}</span>
        //         )
        //     }
        // },{
        //     title: '进口增值税',
        //     dataIndex: 'import_vat',
        //     key: 'import_vat',
        //     render:(data)=>{
        //         const import_vat = formatdata({
        //             type:'priceadd',
        //             data:data
        //         })
        //
        //         return (
        //             <span className="inline-b-ls">{import_vat}</span>
        //         )
        //     }
        // },{
        //     title: '货值手续费',
        //     dataIndex: 'poundage_cn',
        //     key: 'poundage_cn',
        //     render:(data)=>{
        //         const poundage_cn = formatdata({
        //             type:'priceadd',
        //             data:data
        //         })
        //
        //         return (
        //             <span className="inline-b-ls">{poundage_cn}</span>
        //         )
        //     }
        // },{
        //     title: '税费手续费',
        //     dataIndex: 'tariff_import_vat',
        //     key: 'tariff_import_vat',
        //     render:(data)=>{
        //         const tariff_import_vat = formatdata({
        //             type:'priceadd',
        //             data:data
        //         })
        //
        //         return (
        //             <span className="inline-b-ls">{tariff_import_vat}</span>
        //         )
        //     }
        // },{
        //     title: '操作',
        //     key: 'operate',
        //     fixed: 'right',
        //     width:120,
        //     render:(data,record,index) => {
        //
        //         const renderHTML = (
        //             <div>
        //                 <a href="javascript:;" onClick={()=>this.edit(data)}>编辑&nbsp;</a>
        //                 <a href="javascript:;" onClick={() => {this.onDelete(data.id,index)}}>删除</a>
        //             </div>
        //         );
        //
        //         return renderHTML;
        //     }
        // }];

        const dataSource = this.props.dataSource || [];
        const ListIn = dataSource.map((data,index) => {
            return (
                <div className="caogaols">
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={18}>
                            <div className="cao-ls">
                                <Row>
                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <span className="ls-in">
                                            购销合同编号：{data.contract_no}
                                        </span>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <span className="ls-in">
                                            融资订单号：{data.refinance_order_no}
                                        </span>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <span className="ls-in">
                                            申请时间：{data.apply_time}
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <div className="cao-ls">
                                <Row>
                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <div className="deletels">
                                            <a href="javascript:;" onClick={() => {this.onDelete(data.id,index)}} >删除订单</a>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <div className="goon">
                                            <Button type="primary" onClick={()=>this.edit(data)} >继续编辑</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        });

        return (
            <div className="table-for-all">
                <div className="table-for-all-wrap">
                    {ListIn}
                </div>
            </div>
        );
    }
}