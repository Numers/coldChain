import React, {PropTypes, Component} from 'react';
import Lookforall from './Lookforall';
import TableForAll from './TableForAll';
export default class TableAll extends Component {

    render() {
        return (
            <div className="table-class">
                {/*<div className="table-title">订单总表单</div>*/}
                <Lookforall {...this.props} />
                <TableForAll {...this.props} />
            </div>
        )
    }

}

TableAll.propTypes = {};
