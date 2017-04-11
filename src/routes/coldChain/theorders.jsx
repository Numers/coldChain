import React from 'react';
import {connect} from 'dva';
import TheordersContent from 'components/TheordersContent/TheordersContent';

const Theorders = ({location, dispatch, theorders}) => {

    const props = {
        ...theorders,
        lookForAllFn(payload) {
            dispatch({
                type:'theorders/lookForAllFn',
                payload:payload
            });
        },
        pageAll(payload) {
            dispatch({
                type:'theorders/pageAll',
                payload:payload
            });
        },
        renderSmallList(payload) {
            payload.goods_name_cn = '';
            payload.page = '1';
            payload.per = '10';
            dispatch({
                type:'theorders/renderSmallList',
                payload:payload
            });
        },
        lookForSmallFn(payload) {
            dispatch({
                type:'theorders/lookForSmallFn',
                payload:payload
            });
        },
        pageSmallfn(payload) {
            console.log("bbb");
            dispatch({
                type:'theorders/pageSmallfn',
                payload:payload
            });
        },
        gotoFin(payload) {
            dispatch({
              type:'theorders/gotoFin',
                payload:payload
            });
        },
        setrate(payload) {
            dispatch({
                type:'theorders/setrate',
                payload:payload
            });
        },
        updateState(payload) {
            dispatch({
                type:'theorders/updateState',
                payload:payload
            });
        }
    }

    return (
        <TheordersContent {...props}/>
    );

};

function mapStateToProps({ theorders }) {
    return { theorders };
}

export default connect(mapStateToProps)(Theorders);
