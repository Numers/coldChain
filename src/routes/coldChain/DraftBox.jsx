import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router'
import DraftBoxContent from 'components/DraftBoxContent/DraftBoxContent';

const DraftBox = ({location,dispatch,draftBox}) => {
    const props = {
        ...draftBox,
        // setTableParams(payload) {
        //     dispatch({
        //         type:'draftBox/setTableParams',
        //         payload:{...payload}
        //     });
        // },
        //
        // resetTable(payload){
        //     dispatch({
        //         type:'draftBox/resetState',
        //         payload:{...payload}
        //     });
        // },
        //
        // tableOnChange(payload){
        //     dispatch({
        //         type:'draftBox/tableOnChange',
        //         payload:{...payload},
        //     });
        // },
        goto(payload) {
            dispatch(routerRedux.push(payload));
        },

        deleteRow(payload){
            dispatch({
                type:'draftBox/onDelete',
                payload,
            });
        }
    };

    return (
        <DraftBoxContent {...props}/>
    );
};

function mapStateToProps({ draftBox }) {
    return { draftBox };
}

export default connect(mapStateToProps)(DraftBox);