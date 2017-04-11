import { Table, Icon } from 'antd';
import React, {PropTypes, Component} from 'react';
import Drivelist from './drivelist';
import addFile from 'public/img/addfile.png';
export default class driveaction extends Component {
    render() {
        const lastId = this.props.lastId;

        const propsdata= {
            ...this.props
        }

        const drivelist = this.props.chauffeur_list.map((data)=>{
            return (
                <Drivelist key={data.stateId} stateId={data.stateId} {...propsdata} />
            )
        });

        return (
            <div className="driveaction">
                <div className="driveactionwrap clearfix">
                    {drivelist}
                    <div className="getdrivelist" onClick={()=>this.props.addDrive(lastId)}>
                        <div className="getdrivelistwrap">
                            <div className="add_driver">
                                <img src={addFile} />
                                <div className="add_driver_text">
                                    添加提货司机
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}