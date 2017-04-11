import React, {PropTypes, Component} from 'react';
import {Table} from 'antd';
import formatdata from 'formatdata';
export default class TableForAll extends Component {
    onPChange(data) {
        const props = this.props;
        this.props.pageSmallfn({
            page:data.current,
            refinance_apply_id:props.refinance_apply_id_choose,
            per : props.per,
            goods_name_cn : props.goods_name_cn,
            order_type_id:props.order_type_id
        });
    }

    render() {
        let columns;
        let scroll;
        console.log(this.props.order_type_id,'this.props.order_type_id');
        if(this.props.order_type_id == 2) {
            scroll = {x:1800};
            columns = [{
                    title: '商品名称（中文）',
                    width: 130,
                    dataIndex: 'goods_name_cn',
                    key: 'goods_name_cn',
                    fixed: 'left'
                },{
                    title: '商品名称（英文）',
                    dataIndex: 'goods_name_en',
                    key: 'goods_name_en',
                },
                {
                    title: '规格',
                    dataIndex: 'specification',
                    key: 'specification',
                },
                {
                    title: '销项税率',
                    dataIndex: 'tax_point',
                    key: 'tax_point',
                    render:(data) => {
                        return `${data}%`
                    }
                }
                ,
                {
                    title: '计量单位',
                    dataIndex: 'unit',
                    key: 'unit',
                },
                {
                    title: '计价数量',
                    dataIndex: 'num_pi',
                    key: 'num_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '箱数',
                    dataIndex: 'box_num',
                    key: 'box_num',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '单价',
                    dataIndex: 'price_pi',
                    key: 'price_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '合同成交价(不含税)',
                    dataIndex: 'goods_total_price_pi',
                    key: 'goods_total_price_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '融资总金额',
                    dataIndex: 'refinance_total_price_pi',
                    key: 'refinance_total_price_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '柜号',
                    dataIndex: 'cabinet_no',
                    key: 'cabinet_no',
                },{
                    title: '计量单位（CI）',
                    dataIndex: 'unit_ci',
                    key: 'unit_ci',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },{
                    title: '计价数量（CI）',
                    dataIndex: 'num_ci',
                    key: 'num_ci',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },{
                    title: '箱数（CI）',
                    dataIndex: 'box_num_ci',
                    key: 'box_num_ci',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },{
                    title: '单价（CI）',
                    dataIndex: 'price_ci',
                    key: 'price_ci',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },{
                    title: '合同成交价(不含税CI)',
                    dataIndex: 'goods_total_price_ci',
                    key: 'goods_total_price_ci',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },{
                    title: '关税',
                    dataIndex: 'tariff',
                    key: 'tariff',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },{
                    title: '进口增值税',
                    dataIndex: 'import_vat',
                    key: 'import_vat',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },{
                    title: '缴款日期',
                    dataIndex: 'tax_paytime',
                    key: 'tax_paytime',
                    render:(data) => {
                        if(!data) {
                            return '/'
                        }else {
                            return (
                                <span>{data}</span>
                            )
                        }
                    }
                }];
        }else {
            scroll = {x:750};
            columns = [{
                    title: '商品名称（中文）',
                    width: 130,
                    dataIndex: 'goods_name_cn',
                    key: 'goods_name_cn',
                    fixed: 'left'
                },
                {
                    title: '规格',
                    dataIndex: 'specification',
                    key: 'specification',
                },
                {
                    title: '销项税率',
                    dataIndex: 'tax_point',
                    key: 'tax_point',
                    render:(data) => {
                        return `${data}%`
                    }
                },
                {
                    title: '计量单位',
                    dataIndex: 'unit',
                    key: 'unit',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '计价数量',
                    dataIndex: 'num_pi',
                    key: 'num_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '箱数',
                    dataIndex: 'box_num',
                    key: 'box_num',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '单价',
                    dataIndex: 'price_pi',
                    key: 'price_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '合同成交价(含税)',
                    dataIndex: 'goods_total_price_pi',
                    key: 'goods_total_price_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                },
                {
                    title: '融资总金额',
                    dataIndex: 'refinance_total_price_pi',
                    key: 'refinance_total_price_pi',
                    render:(data)=>{
                        const price = formatdata({
                            type:"priceadd",
                            data:data
                        });
                        return (
                            <span className="inline-b-ls">{price}</span>
                        )
                    }
                }];
        }


        const dataSource = this.props.dataSourceSmall;

        return (
            <div className="table-for-all">
                <Table columns={columns} dataSource={dataSource} pagination={{"total":this.props.totalSmall,"current":this.props.pageSmall}} scroll={scroll} onChange={(pagination, filters, sorter)=>this.onPChange({...pagination,...filters,...sorter})}/>
            </div>
        )
    }

}

TableForAll.propTypes = {};
