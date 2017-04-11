import React from 'react';
import {connect} from 'dva';
import PickcenterContent from 'components/pickcenter/pickcenterContent';

const Pickcenter = ({location, dispatch, pickcenter}) => {

    const props = {
        ...pickcenter,
        getTableDataSource(payload) {
            dispatch({
                type:'pickcenter/getTableDataSource',
                payload:payload
            });
        },
        setTableParams(payload) {
            dispatch({
                type:'pickcenter/setTableParams',
                payload:{...payload,"pagesize":10,"last_id":1}
            });
        },
        tableOnChange(payload) {
            dispatch({
                type:'pickcenter/tableOnChange',
                payload:payload
            });
        }
    }

    return (
        <PickcenterContent {...props}/>
    );

};

function mapStateToProps({ pickcenter }) {
    return { pickcenter };
}

export default connect(mapStateToProps)(Pickcenter);
