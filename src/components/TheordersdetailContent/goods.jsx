import React, {PropTypes, Component} from 'react';
import { Form , Table ,Row , Col , Input , DatePicker ,Select } from 'antd';
import formatdata from 'formatdata';

class Goods extends Component {

    render() {

        let scroll;
        let columns = [{
            title: '商品名称（中文）',
            width: 150,
            key: 'goods_name_cn',
            fixed: 'left',
            dataIndex:'goods_name_cn',
        },{
            title: '规格',
            key: 'specification',
            dataIndex:'specification'
        },{
            title: '销项税率',
            key: 'tax_point',
            dataIndex:'tax_point',
            render:(data) => {
                return `${data}%`
            }
        },{
            title: '计量单位',
            key: 'unit',
            dataIndex:'unit',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                });
                return (
                    <span>{price}</span>
                )
            }
        }, {
            title: '计价数量',
            key: 'num_pi',
            dataIndex:'num_pi',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                });
                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '箱数',
            key: 'box_num',
            dataIndex:'box_num',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                });
                return (
                    <span>{price}</span>
                )
            }
        }, {
            title: '单价',
            key: 'price_pi',
            dataIndex:'price_pi',
            render:(data) => {
                const price = formatdata({
                    type:'priceadd',
                    data:data
                });
                return (
                    <span>{price}</span>
                )
            }
        }];

        //如果为外贸 加上ci信息以及关税增值税 和Englishname
        if(this.props.order_type == 2) {
            scroll = {x:1100};
            let add1 = [{
                title: '合同成交价（不含税）',
                key: 'goods_total_price_pi',
                dataIndex:'goods_total_price_pi',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            }];

            let add2 = [{
                title: '柜号',
                key: 'cabinet_no',
                dataIndex: 'cabinet_no'
            },{
                title: '计价数量',
                key: 'num_ci',
                dataIndex: 'num_ci',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '箱数(CI)',
                key: 'box_num_ci',
                dataIndex:'box_num_ci',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '单价',
                key: 'price_ci',
                dataIndex: 'price_ci',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '合同成交价(CI)',
                key: 'goods_total_price_ci',
                dataIndex: 'goods_total_price_ci',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            }];

            let add3 = [{
                title: '关税(人民币)',
                key: 'tariff',
                dataIndex: 'tariff',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '进口增值税(人民币)',
                key: 'import_vat',
                dataIndex: 'import_vat',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            },{
                title: '时间',
                key: 'tax_paytime',
                dataIndex: 'tax_paytime'
            }]

            columns.splice(1,0,{
                title: '商品名称（英文）',
                width: 150,
                key: 'goods_name_en',
                dataIndex:'goods_name_en'
            });

            columns.splice(3,0,{
                title: '厂号',
                key: 'factory_no',
                dataIndex:'factory_no'
            });



            columns = columns.concat(add1);
            if(this.props.statusForTrade > 5 && this.props.statusForTrade <= 9) {
                scroll = {x:1400};
                columns = columns.concat(add2);
            }else if(this.props.statusForTrade > 9) {
                scroll = {x:1600};
                columns = columns.concat(add2,add3);
            }

        }else {
            scroll = {x:900};
            columns.push({
                title: '合同成交价（含税）',
                key: 'goods_total_price_pi',
                dataIndex:'goods_total_price_pi',
                render:(data) => {
                    const price = formatdata({
                        type:'priceadd',
                        data:data
                    });
                    return (
                        <span>{price}</span>
                    )
                }
            })
        }



        const data = this.props.finance_goods_info;

        return (
            <div className="listpart">
                <div className="header-message">
                    商品信息
                </div>
                <div className="formWrapP formWrapPjsl">
                    <Table  pagination={false} columns={columns} dataSource={data} scroll={scroll} />
                </div>
            </div>
        )
    }
}


Goods.propTypes = {};

export default Goods;