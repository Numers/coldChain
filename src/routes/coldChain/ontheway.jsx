import React from 'react';
import {connect} from 'dva';
import OnthewayContent from 'components/ontheway/onthewayContent';

const Ontheway = ({location, dispatch, ontheway}) => {
    const props = {
        ...ontheway,
        getTableDataSource(payload) {
            dispatch({
                type:'ontheway/getTableDataSource',
                payload:payload
            });
        },
        setTableParams(payload) {
            dispatch({
                type:'ontheway/setTableParams',
                payload:{...payload,"per":20,"page":1}
            });
        },
        tableOnChange(payload) {
            dispatch({
                type:'ontheway/tableOnChange',
                payload:payload
            });
        }
    }

    return (
        <OnthewayContent {...props}/>
    );

};

function mapStateToProps({ ontheway }) {
    return { ontheway };
}

export default connect(mapStateToProps)(Ontheway);
