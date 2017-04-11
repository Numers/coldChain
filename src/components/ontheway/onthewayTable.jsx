import './style.css';
import React, {PropTypes, Component} from 'react';
import { Table } from 'antd';
import formatdata from 'formatdata';

const columns = [{
    title: '合同号',
    dataIndex: 'PI',
    key:'1',
    width: 100,
    fixed: 'left'
}, {
    title: '装运日期',
    key:'2',
    width: 100,
    fixed: 'left'
}, {
    title: '港口	',
    key:'3'
},{
    title: '目的港',
    key:'4'
},{
    title: '船公司',
    dataIndex: 'boatCompany',
    key:'5'
},{
    title: '船名',
    key:'6'
},{
    title: '柜号',
    dataIndex: 'SealN',
    key:'7'
},{
    title: '提单号',
    dataIndex: 'BL',
    key:'8'
},{
    title: '报关日期',
    dataIndex: 'DateOfDeclaration',
    key:'9'
},{
    title: '报关单号',
    dataIndex: 'DeclarationNumber',
    key:'10'
},{
    title: '报检号',
    dataIndex: 'ReprotNumber',
    key:'11'
},{
    title: '付款条款',
    key:'12'
},{
    title: '贸易条款(CIF)',
    key:'13'
},{
    title: '合同金额',
    //dataIndex: 'CI',
    key:'14',
    render:(data)=>{
        //priceadd
        const price = formatdata({
            type:'priceadd',
            data:data.CI
        })

        return (<span>{price}</span>)
    }
},{
    title: '总净重／kg',
    dataIndex: 'NetWeight',
    key:'15'
},{
    title: '到港日期',
    dataIndex: 'ArrivalDate',
    key:'16'
}];


export default class onthewayTable extends Component {

    render() {

        const dataSource = this.props.dataSource;
        const current = this.props.current;
        const total = this.props.total;
        return (
            <div className="onthewayTable">
                <Table columns={columns}
                       dataSource={dataSource}
                       pagination={{"total":total,"current":current}}
                       onChange={(pagination, filters, sorter)=>this.props.tableOnChange({...pagination,...filters,...sorter})}
                       scroll={{ x: 2000 }}
                />
            </div>
        )
    }
}

onthewayTable.propTypes = {};
