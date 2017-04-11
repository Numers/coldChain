import React, {PropTypes, Component} from 'react';
import './style.css';
import TableAll from './TableAll';
import OpenTable from './OpenTable';

export default class TheordersContent extends Component {
    //test
    render() {
        return (
            <div className="TheordersContent_shas">
                <TableAll {...this.props} />
                <OpenTable {...this.props} />
            </div>
        )
    }
}

TheordersContent.propTypes = {};
