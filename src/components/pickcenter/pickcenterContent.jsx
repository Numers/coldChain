import './style.css';
import React, {PropTypes, Component} from 'react';
import Pickcenterform from './pickcenterform';
import Pickcentertable from './pickcenterTable';

export default class pickcenterContent extends Component {

    render() {
        return (
            <div className="pickcenterContent_hdjak239">
                <Pickcenterform {...this.props} />
                <Pickcentertable {...this.props} />
            </div>
        )
    }
}

pickcenterContent.propTypes = {};
