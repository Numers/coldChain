import React from 'react';
import {connect} from 'dva';
import TopNavContent from 'components/Common/TopNav/TopNav';

const TopNav = ({location, dispatch, prop , loginregforget}) => {
    const history = prop.history;

    const props = {
        ...loginregforget,
        logout(payload) {
            dispatch({
                type:'loginregforget/logout',
                payload:{
                    history:history
                }
            });
        }
    }
    return (
        <TopNavContent {...props} />
    );

};

function mapStateToProps({ loginregforget }) {
    return { loginregforget };
}

export default connect(mapStateToProps)(TopNav);
