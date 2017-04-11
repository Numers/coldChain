import React, {PropTypes, Component} from 'react';
import { Table } from 'antd';

export default class CargoInformationContent extends Component {

    render() {

        const columns = [
            {
                title:'PI号',
                dataIndex:'batch',
                key:'batch'
            },
            {
                title:'GLP合同号',
                dataIndex:'buy_order_number',
                key:'buy_order_number'
            },
            {
                title:'货物名称',
                dataIndex:'goods_name',
                key:'goods_name'
            },
            {
                title:'厂号',
                dataIndex:'producer',
                key:'producer'
            },
            {
                title:'规格',
                dataIndex:'specifications',
                key:'specifications'
            },
            {
                title:'提货重量',
                dataIndex:'goods_weight',
                key:'goods_weight'
            },
            {
                title:'提货件数',
                dataIndex:'count',
                key:'count'
            },
        ];

        const dataSource = this.props.goodsMessage;

        return (
            <div className="CargoInformationContent">
                <div className="CargoInformationContentWrap">
                    <div className="CargoInformationheader">
                        货物信息
                    </div>
                    <div className="CargoInformationbody">
                        <div className="CargoInformationbodywrap">
                            <Table columns={columns} dataSource={dataSource}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CargoInformationContent.propTypes = {};
