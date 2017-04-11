import React from 'react';
import {connect} from 'dva';
import TradeAgentContent from 'components/TradeAgentContent/TradeAgentContent';

const TradeAgent = ({location, dispatch, tradeAgent}) => {

    const props = {
        ...tradeAgent,
        queryrender(payload) {
            dispatch({
                type:'tradeAgent/queryrender',
                payload:payload
            });
        },
        setrate(payload) {
            dispatch({
                type:'tradeAgent/setrate',
                payload:payload
            });
        }
    }

    return (
        <TradeAgentContent {...props} />
    );

};

function mapStateToProps({ tradeAgent }) {
    return { tradeAgent };
}

export default connect(mapStateToProps)(TradeAgent);
