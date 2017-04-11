import React, {PropTypes, Component} from 'react';
import {Link} from 'dva/router';
import './style.css';
import loginLogo from "public/img/loginLogo.png";
import loginbg from "public/img/loginimg.png";

import Formreturn from './loginform';
export default class LoginContent extends Component {

    render() {
        return (
            <div className="logincontent_sja2232">
                <div className="logincontentwrap clearfix">
                    <div className="imgbg">
                        <img className="imgbgls" src={loginbg} />
                    </div>
                    <div className="loginform">
                        <div className="header">请登录</div>
                        <div className="loginlogo">
                            <img src={loginLogo} className="logoimg"/>
                        </div>
                        <div className="loginforminput">
                            <div className="loginforminputwrap">
                                <Formreturn {...this.props}/>
                                <div className="regandforget clearfix">
                                    <div className="forget">
                                        {/*<Link to="loginRegForget/forget" style={{fontSize:'14px'}} >忘记密码</Link>*/}
                                    </div>
                                    {/*<div className="reg">*/}
                                        {/*<Link to="loginRegForget/reg" style={{fontSize:'14px'}} >免费注册</Link>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LoginContent.propTypes = {};
