import './style.css';
import React, {PropTypes, Component} from 'react';
import Onthewayform from './onthewayform';
import Onthewaytable from './onthewayTable';

export default class onthewayContent extends Component {

    render() {
        return (
            <div className="onthewayContent_hdjak239">
                <Onthewayform {...this.props} />
                <Onthewaytable {...this.props} />
            </div>
        )
    }
}

onthewayContent.propTypes = {};
