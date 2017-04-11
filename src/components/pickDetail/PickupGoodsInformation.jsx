import React, {PropTypes, Component} from 'react';
import { Table } from 'antd';

export default class PickupGoodsInformation extends Component {

    render() {

        const columns = [
            {
                title:'提货单位',
                dataIndex:'delivery_unit',
                key:'delivery_unit'
            },
            {
                title:'所在仓库',
                dataIndex:'warehouse_name',
                key:'warehouse_name'
            },
            {
                title: '期望提货时间',
                dataIndex: 'time',
                key: 'time'
            }
        ];

        const dataSource = this.props.pickupMessage;

        return (
            <div className="CargoInformationContent">
                <div className="CargoInformationContentWrap">
                    <div className="CargoInformationheader">
                        提货信息
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

PickupGoodsInformation.propTypes = {};
