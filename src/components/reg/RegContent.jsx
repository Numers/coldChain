import React, {PropTypes, Component} from 'react';
import './style.css';
import RegForm from './RegForm';
export default class RegContent extends Component {

    render() {
        return (
            <div className="reg_hsajd2949">
                <div className="reg_wrap">
                    <RegForm {...this.props}/>
                </div>
            </div>
        )
    }
}

RegContent.propTypes = {};
