import React from 'react';
import {connect} from 'dva';
import RegContent from 'components/reg/RegContent';

const Reg = ({location, dispatch, reg, history}) => {

    const props = {
        ...reg,
        userTypeFn(payload) {
            dispatch({
                type:'reg/userTypeChange',
                payload:payload
            });
        },
        projectTypeFn(payload) {
            dispatch({
                type:'reg/projectTypeChange',
                payload:payload
            });
        },
        getCaptcha(payload) {
            dispatch({
                type:'reg/captcha',
                payload:payload
            });
        },
        submit(payload) {
            dispatch({
                type:'reg/submit',
                payload:{payload:payload,history:history}
            });
        }
    }

    return (
        <RegContent {...props} />
    );

};

function mapStateToProps({ reg }) {
    return { reg };
}

export default connect(mapStateToProps)(Reg);
