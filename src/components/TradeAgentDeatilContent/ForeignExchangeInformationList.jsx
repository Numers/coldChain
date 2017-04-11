import React, {PropTypes, Component} from 'react';
import ForeignExchangeInformation from './ForeignExchangeInformation';
import ForeignExchangeInformationupload from './ForeignExchangeInformationupload';
import formatdata from 'formatdata';
class ForeignExchangeInformationList extends Component {

    render() {
        let columns1 = [{
            title: '收GLP预付日期',
            width: 150,
            fixed: 'left',
            dataIndex:'payment_time',
        },{
            title: '收GLP预付',
            width: 150,
            fixed: 'left',
            dataIndex:'actual_money',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '购汇日期',
            dataIndex:'exchange_time'
        },{
            title: '购汇汇率',
            dataIndex:'exchange_rate'
        },{
            title: '币种',
            dataIndex:'money_code'
        },{
            title: '付出预付（外币）',
            dataIndex:'money',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }, {
            title: '付出预付（人民币）',
            dataIndex:'money_cn',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }];

        let columns2 = [{
            title: '收GLP尾款日期',
            width: 150,
            fixed: 'left',
            dataIndex:'payment_time',
        },{
            title: '收GLP尾款',
            width: 150,
            fixed: 'left',
            dataIndex:'actual_money',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        },{
            title: '购汇日期',
            dataIndex:'exchange_time'
        },{
            title: '购汇汇率',
            dataIndex:'exchange_rate'
        },{
            title: '币种',
            dataIndex:'money_code'
        },{
            title: '付出尾款（外币）',
            dataIndex:'money',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }, {
            title: '付出尾款（人民币）',
            dataIndex:'money_cn',
            render:(data)=>{
                const price = formatdata({
                    type:'priceadd',
                    data:data
                })

                return (
                    <span>{price}</span>
                )
            }
        }];

        const finance_purch_info = this.props.finance_purch_info || [];

        let renderWhich = {};

        if(this.props.flag == 9) {
            renderWhich = {
                render:true,
                title:'GLP预付款购汇信息',
                file_type:'10',
                exchange_type: "1"
            }
        } else if(this.props.flag == 11) {
            renderWhich = {
                render:true,
                title:'尾款购汇信息',
                file_type:'11',
                exchange_type: "2"
            }
        } else {
            renderWhich = {

            }
        }

        //operate_flag 为1的时候是要输入的 2的时候是要查出来的
        let datasourceupload = [];
        const finance_purch_infoMess = finance_purch_info.map((data) => {
            if(data.operate_flag == 2) {
                if(data.exchange_type == 1) {
                    return (
                        <ForeignExchangeInformation {...this.props} columns = {columns1} datasource={data} />
                    )
                } else if(data.exchange_type == 2) {
                    return (
                        <ForeignExchangeInformation {...this.props} columns = {columns2} datasource={data} />
                    )
                } else {
                    return '';
                }

            } else {
                datasourceupload.push(data);
            }
        });

        return (
            <div className="foreignlist">
                {finance_purch_infoMess}
                <ForeignExchangeInformationupload {...this.props} renderWhich={renderWhich} datasource={datasourceupload} />
            </div>
        )
    }
}

ForeignExchangeInformationList.propTypes = {};

export default ForeignExchangeInformationList;