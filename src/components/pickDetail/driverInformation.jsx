import React, {PropTypes, Component} from 'react';
import { Table } from 'antd';

export default class DriverInformation extends Component {

    render() {

        const columns = [
            {
                title:'司机姓名',
                dataIndex:'name',
                key:'name'
            },
            {
                title:'车牌号',
                dataIndex:'license_plate_number',
                key:'license_plate_number'
            },
            {
                title:'司机电话',
                dataIndex:'mobile',
                key:'mobile'
            }
        ];

        const dataSource = this.props.driverMessage;

        return (
            <div className="CargoInformationContent">
                <div className="CargoInformationContentWrap">
                    <div className="CargoInformationheader">
                        司机信息
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

DriverInformation.propTypes = {};
