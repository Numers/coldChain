import React, {PropTypes, Component} from 'react';
import Lookforall from './Lookfordetail';
import TableForAll from './Tablefordetail';
export default class TableDetail extends Component {

    render() {
        return (
            <div className="table-class table-class-ls">
                {/*<div className="table-title">订单明细</div>*/}
                {/*<Lookforall {...this.props} />*/}
                <TableForAll {...this.props} />
            </div>
        )
    }
}

TableDetail.propTypes = {};
