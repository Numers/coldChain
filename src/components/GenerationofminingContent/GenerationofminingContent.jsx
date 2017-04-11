import './style.css';
import React, {PropTypes, Component} from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router'
import FormWrap from './formwrap';

class GenerationofminingContent extends Component {

    componentDidMount() {
        this.props.getMessageCountOfDraftBox();
    }

    render() {
        console.log(this.props,'this.props');
        let formcomponent;
        if(this.props.render) {
            formcomponent = (<FormWrap {...this.props} />);
        } else {
            formcomponent = "";
        }
        return (
            <div className="GenerationofminingContent_jwoeq">
                <div className="bread">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/coldChain/businessTypes">融资申请</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>选择业务类型</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="caogaox">
                        <Link to="/coldChain/draftBox">
                            草稿箱
                            <span className="messageCountClass">({this.props.messageCountOfDraftBox})</span>
                        </Link>
                    </div>
                </div>
                <div className="sendformwrap">
                    {formcomponent}
                </div>
            </div>
        )
    }
}

GenerationofminingContent.propTypes = {};

export default GenerationofminingContent;