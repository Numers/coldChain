import React from 'react';
import {connect} from 'dva';
import MyPickContent from 'components/mypick/mypickContent';

const MyPick = ({location, dispatch, mypick , history}) => {
    const props = {
        ...mypick,
        addDrive(payload) {
            dispatch({
                type:'mypick/addDrive',
                payload:payload || ''
            });
        },
        removeDrive(payload) {
            dispatch({
                type:'mypick/removeDrive',
                payload:payload || ''
            });
        },
        driverSubmit(payload) {
            dispatch({
                type:'mypick/driverSubmit',
                payload:payload || ''
            });
        },
        timer(payload) {
            dispatch({
                type:'mypick/timer',
                payload:payload || ''
            });
        },
        getQuantity(payload) {
            dispatch({
                type:'mypick/getQuantity',
                payload:payload || ''
            });
        },
        submitMypick(payload) {
            dispatch({
                type:'mypick/submitMypick',
                payload:{
                    history:history,
                    payload:payload || ''
                }
            });
        },
        clickToCaoCu(payload) {
            dispatch({
                type:'mypick/clickToCaoCu',
                payload:payload
            });
        },
        handleChange(payload) {
            dispatch({
                type:'mypick/handleChange',
                payload:payload
            })
        }
    }

    return (
        <MyPickContent {...props}/>
    );

};

function mapStateToProps({ mypick }) {
    return { mypick };
}

export default connect(mapStateToProps)(MyPick);
