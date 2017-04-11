import './style.css';
import React, {PropTypes, Component} from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'dva/router';
import leftnav from 'public/img/leftnav.png';

const SubMenu = Menu.SubMenu;
class LeftNavContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onHashChange() {
        const pathname = this.props.location && this.props.location.pathname;
        if(pathname == '/coldChain/businessTypes' || pathname == '/coldChain/generationofmining' || pathname == "/coldChain/draftBox") {
            this.setState({
                selectedKeys:['1'],
                openKeys:['sub1']
            })
        }else if(pathname == '/coldChain/theorders' || pathname == '/coldChain/theordersdetail') {
            this.setState({
                selectedKeys:['2'],
                openKeys:['sub1']
            })
        }else if(pathname == '/coldChain/mypick') {
            this.setState({
                selectedKeys:['3'],
                openKeys:['sub2']
            })
        }else if(pathname == '/coldChain/pickcenter' || pathname.match('/coldChain/pickDetail')) {
            this.setState({
                selectedKeys:['4'],
                openKeys:['sub2']
            })
        }else if(pathname == '/coldChain/ontheway') {
            this.setState({
                selectedKeys:['5'],
                openKeys:['sub3']
            })
        }else if(pathname == '/coldChain/todoList') {
            this.setState({
                selectedKeys:['6'],
                openKeys:['sub4']
            })
        }
    }

    componentDidMount() {
        if(this.onHashChange) {
            this.onHashChange();
        }

        window.onhashchange = () => {
            setTimeout(() => {
                if(this.onHashChange) {
                    this.onHashChange();
                }
            },300);
        }
    }

    componentWillUnmount() {
        this.onHashChange = null;
    }


    // handleClick(e) {
    //     this.setState({
    //         selectedKeys:[e.key]
    //     });
    // }

    render() {

        const dataSource = [{
            title:'待办任务',
            key:'sub4',
            children:[{
                key:'6',
                option:'待办事项',
                link:'/coldChain/todoList'
            }]
            },{
            title:'融资采购处理',
            key:'sub1',
            children:[{
                key:'1',
                option:'新增融资申请',
                link:'/coldChain/businessTypes'
            },{
                key:'2',
                option:'融资订单查询',
                link:'/coldChain/theorders'
            }]
        },{
            title:'还款赎货信息',
            key:'sub2',
            children:[{
                key:'3',
                option:'新增赎货申请',
                link:'/coldChain/mypick'
            },{
                key:'4',
                option:'赎货订单查询',
                link:'/coldChain/pickcenter'
            }]
        },{
            title:'海运在途信息',
            key:'sub3',
            children:[{
                key:'5',
                option:'在途信息查询',
                link:'/coldChain/ontheway'
            }]
        }];

        const renderHTML = dataSource.map((data)=>{
            let renderMenu;
            if(data.children) {
                renderMenu = data.children.map((data2) => {
                    return (
                        <Menu.Item key={data2.key}>
                            <Link to={data2.link} className="link-a">{data2.option}</Link>
                        </Menu.Item>
                    )
                });
            }

            return (<SubMenu key={data.key} title={data.title}>
                        {renderMenu}
                    </SubMenu>)
        });

        const selectedKeys = this.state.selectedKeys;
        const openKeys = this.state.openKeys;
        return (
            <div className={this.props.classNav}>
                <div className="inleft">
                    <img src={leftnav} className="navleftimg" onClick={()=>this.props.changeState({showleft:false})}/>
                </div>
                <Menu
                    style={{ width: 200 }}
                    defaultOpenKeys={['sub1','sub2','sub3','sub4']}
                    selectedKeys={selectedKeys}
                    mode="inline"
                >
                    {renderHTML}
                </Menu>
            </div>
        );
    }
}


export default LeftNavContent;