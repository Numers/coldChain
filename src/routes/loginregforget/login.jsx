import React from 'react';
import {connect} from 'dva';
import LoginContent from 'components/login/LoginContent';
import { routerRedux } from 'dva/router';
const handleLocalHistory = (dispatch) => {

    let business = localStorage.getItem('business');

    if(!business && business!='') {
        return;
    }

    switch (business) {
        case "chain":
            dispatch(routerRedux.push('/coldChain/businessTypes'));
            break;
        case "trade_agent":
            dispatch(routerRedux.push('/coldChain/tradeAgent'));
            break;
        default:
            dispatch(routerRedux.push('/coldChain/businessTypes'));
    };
}

const Login = ({location, dispatch, history , loginregforget}) => {

    if(localStorage.getItem('token')) {
        handleLocalHistory(dispatch);
    }

    const props = {
        ...loginregforget,
        login(data) {
            dispatch({
                type:"loginregforget/login",
                payload:data
            })
        }
    };

    return (
        <LoginContent {...props}/>
    );

};

function mapStateToProps({ loginregforget }) {
    return { loginregforget };
}

export default connect(mapStateToProps)(Login);
