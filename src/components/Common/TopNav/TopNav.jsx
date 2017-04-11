import React, {PropTypes, Component} from 'react';
import formatdata from "formatdata";
import './style.css';
import { Link } from "dva/router";
import telimg from 'public/img/phone.png';
import people from 'public/img/lianxi.png';
import logonew from 'public/img/logonew.png';
import navright from 'public/img/navright.png';
export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false
        }
    }

    changenav(payload) {
        const show = this.state.show;
        this.setState({
            show:!show
        });
    }

    render() {

        const logout = this.props.logout;
        let renderHTML = '';
        let renderMoney = '';
        let renderSmallNav = '';
        if(!localStorage || !localStorage.getItem('token')) {
            renderHTML = '';

        } else {

            const name = localStorage.getItem('company') + " " +localStorage.getItem('name');
            const styleless = this.state.show?{height:'205px'}:{height:'0px'};
            const prdcreditamt = localStorage.getItem('prdcreditamt');
            const usedamt = localStorage.getItem('usedamt');
            const availamt = localStorage.getItem('availamt');
            const enddate = localStorage.getItem('enddate');
            const business = localStorage.getItem('business');
            //priceadd

            const prdcreditamtformat = formatdata({
                type:'priceadd',
                data:prdcreditamt
            });

            const usedamtformat = formatdata({
                type:'priceadd',
                data:usedamt
            });

            const availamtformat = formatdata({
                type:'priceadd',
                data:availamt
            });

            const enddateformat = formatdata({
                type:'YYMMDD',
                data:enddate
            });

            renderHTML = (
                <span>
                    <img className="peopleimg" src={people} />
                    <span>{name}</span>
                    <span className="marall">|</span>
                    <span style={{"cursor":"pointer"}} onClick={logout}>退出登录</span>
                </span>
            );

            if(business == 'chain') {
                renderMoney = (
                    <span className="listmargin">
                        <span className="money-text">授信额度：{prdcreditamtformat}</span>
                        <span className="money-text">已用：{usedamtformat}</span>
                        <span className="money-text">可用：{availamtformat}</span>
                        <span className="money-text">到期：{enddateformat}</span>
                    </span>
                );
            }

            renderSmallNav = (
                <div className="smallshownav">
                    <div className="listing">
                        <img src={navright} className="ls-img" onClick={()=>this.changenav()}/>
                    </div>
                    <div className="listnav" style={styleless} onClick={()=>this.changenav()}>
                        <div className="listahref">
                            <Link to="/coldChain/businessTypes">融资申请</Link>
                        </div>
                        <div className="listahref">
                            <Link to="/coldChain/theorders">订单查询</Link>
                        </div>
                        <div className="listahref">
                            <Link to="/coldChain/mypick">提货申请</Link>
                        </div>
                        <div className="listahref">
                            <Link to="/coldChain/pickcenter">订单查询</Link>
                        </div>
                        <div className="listahref">
                            <Link to="/coldChain/ontheway">在途信息</Link>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div className="topnav">
                <div className="topnav_top">
                    <div className="topnav_top_wrap">
                        <div className="topnav_top_wrap_in clearfix">
                            <div className="topnav_top_left">
                                <img className="logoimgnew" src={logonew} />
                                <span className="logo-text">欢迎来到普洛斯金融</span>
                                <span className="span_ml">
                                    <img className="telimg" src={telimg} />
                                    <span>021-6105 3999</span>
                                </span>
                            </div>
                            <div className="topnav_top_right">
                                {renderMoney}
                                {renderHTML}
                            </div>
                        </div>
                    </div>
                    {renderSmallNav}
                </div>
            </div>
        )
    }
}

TopNav.propTypes = {};
