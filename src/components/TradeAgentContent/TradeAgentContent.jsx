import React, {PropTypes, Component} from 'react';
import './style.css';
import LookFor from './LookFor';
import TableArea from './TableArea';
import { Row , Col } from 'antd';

export default class TradeAgentContent extends Component {

    render() {
        return (
            <div className="TradeAgentContent_shjak22">
                <Row>
                    <Col xs={{span:'18',offset:'3'}} sm={{span:'18',offset:'3'}} md={{span:'18',offset:'3'}} lg={{span:'20',offset:'2'}} >
                        <LookFor {...this.props} />
                        <TableArea {...this.props} />
                    </Col>
                </Row>
            </div>
        )
    }
}

TradeAgentContent.propTypes = {};
