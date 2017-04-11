import React, {PropTypes, Component} from 'react';

import AdvancePayment from './AdvancePayment';

class AdvancePaymentList extends Component {

    render() {
        let finance_payment_infoSingle;
        if(this.props.payType == 'AdvancePayment') {
            finance_payment_infoSingle = this.props.finance_payment_info && this.props.finance_payment_info['1'] || [];
        } else if(this.props.payType == 'Poundage') {
            finance_payment_infoSingle = this.props.finance_payment_info && this.props.finance_payment_info['2'] || [];
        }

        return (
            <AdvancePayment {...this.props} finance_payment_infoSingle = {finance_payment_infoSingle} />
        )
    }

}


AdvancePaymentList.propTypes = {};

export default AdvancePaymentList;