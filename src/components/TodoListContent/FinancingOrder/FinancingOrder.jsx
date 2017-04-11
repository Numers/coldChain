import React, {PropTypes, Component} from 'react';
import './style.css';
import TableAll from './TableAll';
import OpenTable from './OpenTable';
export default class FinancingOrder extends Component {

    render() {
        return (
            <div className="TheordersContent_shas">
                <TableAll {...this.props} />
                <OpenTable {...this.props} />
            </div>
        )
    }
}

FinancingOrder.propTypes = {};