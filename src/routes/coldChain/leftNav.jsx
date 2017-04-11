import React,{Component} from 'react';
import LeftNavContent from 'components/LeftNavContent/LeftNavContent';
import woyaotihuo from 'public/img/woyaotihuo.png';
import woyaotihuoact from 'public/img/woyaotihuoact.png';
import tihuoct from 'public/img/tihuoct.png';
import tihuoctact from 'public/img/tihuoctact.png';
import ontheway from 'public/img/ontheway.png';
import onthewayact from 'public/img/onthewayact.png';
import classnames from 'classnames';
import navright from 'public/img/navright.png';

const dataSource = [
    {
        linkto:'/coldChain/mypick',
        title:'我要提货',
        activeimg:woyaotihuoact,
        normalimg:woyaotihuo,
        activeClassName:'leftnav_active',
        key:1
    },
    {
        linkto:'/coldChain/pickcenter',
        title:'提货中心',
        activeimg:tihuoctact,
        normalimg:tihuoct,
        activeClassName:'leftnav_active',
        key:2
    },
    {
        linkto:'/coldChain/ontheway',
        title:'在途信息',
        activeimg:onthewayact,
        normalimg:ontheway,
        activeClassName:'leftnav_active',
        key:3
    }
];

export default class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showleft:true
        }
    }

    changeState(payload) {
        this.setState(payload);
    }

    render() {
        const showleft = this.state.showleft;
        const classNav = classnames({'leftnav_sjsld':showleft,'leftnav_sjsld leftnav_sjsld_act':!showleft});
        const classWrap = classnames({'right-wrap':showleft,'right-wrap right-wrap-act':!showleft});
        return (
            <div className="wrap_for_coldChain">
                <div className="wrap_for_coldChain_wrap clearfix">
                    <LeftNavContent {...this.props} classNav={classNav} changeState={(payload)=>this.changeState(payload)} dataSource = {dataSource}/>
                    <div className="fix-left">
                        <img src={navright} className="navright" onClick={()=>{this.changeState({showleft:true})}}/>
                    </div>
                    <div className={classWrap}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )

    }
}