import React, {PropTypes, Component} from 'react';
import ForeignChangeInformation from './ForeignChangeInformation';
import formatdata from 'formatdata';
class ForeignChangeInformationList extends Component {

    render() {

        let columns1 = [{
            title: '收GLP预付日期',
            width: 120,
            fixed: 'left',
            dataIndex:'payment_time',
        },{
            title: '收GLP预付',
            dataIndex:'actual_money',
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
            title: '购汇日期',
            dataIndex:'exchange_time'
        },{
            title: '汇率',
            dataIndex:'exchange_rate'
        },{
            title: '币种',
            dataIndex:'money_code'
        },{
            title: '付出预付（外币）',
            dataIndex:'money',
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
            title: '付出预付（人民币）',
            dataIndex:'money_cn',
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

        let columns2 = [{
            title: '收GLP尾款日期',
            width: 120,
            fixed: 'left',
            dataIndex:'payment_time',
        },{
            title: '收GLP尾款',
            dataIndex:'actual_money',
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
            title: '购汇日期',
            dataIndex:'exchange_time'
        },{
            title: '汇率',
            dataIndex:'exchange_rate'
        },{
            title: '币种',
            dataIndex:'money_code'
        },{
            title: '付出尾款（外币）',
            dataIndex:'money',
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
            title: '付出尾款（人民币）',
            dataIndex:'money_cn',
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

        const finance_purch_info = this.props.finance_purch_info || [];

        const finance_purch_infoMess = finance_purch_info.map((data) => {

            if(data && data.exchange_type==1) {
                return (
                    <ForeignChangeInformation {...this.props} columns = {columns1} datasource={data} />
                )
            }else if(data && data.exchange_type==2) {
                return (
                    <ForeignChangeInformation {...this.props} columns = {columns2} datasource={data} />
                )
            }

        });

        return (
            <div className="listpart">
                {finance_purch_infoMess}
            </div>
        )
    }

}


ForeignChangeInformationList.propTypes = {};

export default ForeignChangeInformationList;