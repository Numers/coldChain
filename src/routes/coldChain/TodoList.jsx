import React from 'react';
import {connect} from 'dva';
import TodoListContent from 'components/TodoListContent/TodoListContent';

const TodoList = ({location, dispatch, todoList}) => {
    const props = {
        ...todoList,
        lookForAllFn(payload) {
            dispatch({
                type:'todoList/lookForAllFn',
                payload:payload
            });
        },
        pageAll(payload) {
            dispatch({
                type:'todoList/pageAll',
                payload:payload
            });
        },
        renderSmallList(payload) {
            payload.goods_name_cn = '';
            payload.page = '1';
            payload.per = '10';
            dispatch({
                type:'todoList/renderSmallList',
                payload:payload
            });
        },
        lookForSmallFn(payload) {
            dispatch({
                type:'todoList/lookForSmallFn',
                payload:payload
            });
        },
        pageSmallfn(payload) {
            console.log("bbb");
            dispatch({
                type:'todoList/pageSmallfn',
                payload:payload
            });
        },
        gotoFin(payload) {
            dispatch({
                type:'todoList/gotoFin',
                payload:payload
            });
        },
        setrate(payload) {
            dispatch({
                type:'todoList/setrate',
                payload:payload
            });
        },
        updateState(payload) {
            dispatch({
                type:'todoList/updateState',
                payload:payload
            });
        },

        /*以下为提货订单页面action*/
        renderPickOrderTable(payload){
            dispatch({
                type:'todoList/renderPickOrderTable',
                payload:payload,
            });
        },
        tableOnChange(payload) {
            dispatch({
                type:'todoList/tableOnChange',
                payload:payload
            });
        },
        setTableParams(payload) {
            dispatch({
                type:'todoList/setTableParams',
                payload:{...payload,"pagesize":10,"last_id":1,"todo":1}
            });
        },
    }
    return (
        <TodoListContent {...props}/>
    );

};

function mapStateToProps({ todoList }) {
    return { todoList };
}

export default connect(mapStateToProps)(TodoList);