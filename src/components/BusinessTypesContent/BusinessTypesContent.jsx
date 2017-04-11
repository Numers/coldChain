import React, {PropTypes, Component} from 'react';
import './style.css';
import {Row,Col} from 'antd';
import { Link } from 'dva/router';
import type1 from 'public/img/type1.png';
import type2 from 'public/img/type3.png';
import type3 from 'public/img/type2.png';
import type4 from 'public/img/type4.png';
import { message } from 'antd';

message.config({
    top: 50,
    duration: 2,
});

class BusinessTypesContent extends Component {
    showmsg() {
        //暂未开通，敬请等待
        message.error('暂未开通，敬请等待');
    }
    MouseOver(event) {
        event.preventDefault();
        const e = event || window.event;
        const target = e.target;
        // if(target.className.match('inwrap')){
            target.className = 'inwrap inwrapact';
        // }

    }

    MouseLeave(event) {
        event.preventDefault();
        const e = event || window.event;
        const target = e.target;
        // if(target.className.match('inwrap')){
            target.className = 'inwrap';
        // }
    }

    render() {
        return (
            <div className="BusinessTypesContent_qowioq">
                <div className="bistitle">请选择业务类型</div>
                <div className="imgwrap">
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <div className="inwrap" >
                                <Link to={{pathname:"/coldChain/generationofmining",'query':{'order_type':2}}}>
                                    <img src={type1} onMouseOver={(e)=>{this.MouseOver(e)}} onMouseLeave={(e)=>this.MouseLeave(e)}/>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <div className="inwrap">
                                <Link to={{pathname:"/coldChain/generationofmining",'query':{'order_type':1}}}>
                                    <img src={type2} onMouseOver={(e)=>{this.MouseOver(e)}} onMouseLeave={(e)=>this.MouseLeave(e)}/>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <div className="inwrap" onClick={()=>this.showmsg()}>
                                <img src={type3} onMouseOver={(e)=>{this.MouseOver(e)}} onMouseLeave={(e)=>this.MouseLeave(e)}/>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <div className="inwrap" onClick={()=>this.showmsg()}>
                                <img src={type4} onMouseOver={(e)=>{this.MouseOver(e)}} onMouseLeave={(e)=>this.MouseLeave(e)}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


export default BusinessTypesContent;