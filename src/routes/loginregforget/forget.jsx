import React from 'react';
import {connect} from 'dva';
import TopNav from 'components/Common/TopNav/TopNav';
import ForgetContent from 'components/forget/ForgetContent';
const Forget = ({location, dispatch, loginregforget}) => {

    const {loading} = loginregforget;

    const models = {
    };

    return (
        <ForgetContent/>
    );

};

function mapStateToProps({ loginregforget }) {
    return { loginregforget };
}

export default connect(mapStateToProps)(Forget);
