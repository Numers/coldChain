import React, {PropTypes, Component} from 'react';
import './style.css';
// import SearchDraftBox from './DraftBox/SearchDraftBox';
import DraftBoxTable from './DraftBox/DraftBoxTable';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';

export default class DraftBoxContent extends Component
{
    render(){
        return (
            <div className="DraftBoxWrap">
                <div className="DraftBoxContent">
                    {/*<SearchDraftBox {...this.props}/>*/}
                    <div className="Breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/coldChain/businessTypes">融资申请</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>草稿箱列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <DraftBoxTable {...this.props} />
                </div>
            </div>
        );
    }
}