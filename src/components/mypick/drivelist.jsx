import { Table, Icon } from 'antd';
import React, {PropTypes, Component} from 'react';
import Listform from './listForm';
import deleteImg from 'public/img/deleteImg.png';
export default class driverlist extends Component {

    render() {
        const stateId = this.props.stateId;
        return (
            <div className="getdrivelist">
                <div className="getdrivelistwrap">
                    <div className="deletewrap" onClick={()=>this.props.removeDrive(stateId)}>
                        <img src={deleteImg} className="deleteImg"/>
                    </div>
                    <Listform {...this.props} key={stateId}/>
                </div>
            </div>
        )
    }
}