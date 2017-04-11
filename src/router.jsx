import React from 'react';
import { Router, Route , IndexRedirect} from 'dva/router';
//动态加入model

const cached = {};
function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

//registerModel(app, require('./models/users'));

export default function ({ history, app }) {

    const wrap = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/app'));
        });
    };

    //登陆注册忘记密码
    const loginComponent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/loginregforget/login'));
        });
    };

    const regComponent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/loginregforget/reg'));
        });
    };

    const forgetComponent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/loginregforget/forget'));
        });
    };


    //冷链

    const leftNav = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/leftNav'));
        });
    }

    const todoListComponent = (nextState,cb) => {
        require.ensure([], require => {
           cb(null, require('routes/coldChain/TodoList'));
        });
    }

    const draftBoxComponent = (nextState,cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/DraftBox'));
        });
    }

    const mypickComponent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/mypick'));
        });
    }

    const pickcenterComponent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/pickcenter'));
        });
    }

    const onthewayComponent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/ontheway'));
        });
    }

    const pickDetailComponent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/pickDetail'));
        });
    }

    const businessTypes = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/businessTypes'));
        });
    }

    const generationofmining = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/generationofmining'));
        });
    }

    const theorders = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/theorders'));
        });
    }

    const theordersdetail = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/theordersdetail'));
        });
    }

    const tradeAgent = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/tradeAgent'));
        });
    }

    const tradeAgentDeatil = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/coldChain/tradeAgentDeatil'));
        });
    }


    //公共组件 如弹窗 loading
    const CommonComponents = (nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('routes/commonComponents/app'));
        });
    };

    //登陆校验
    const loginAuth = ({location}, replace) => {
        let token = localStorage.getItem('token');
        let pathname = location.pathname;
        if(!token) {
            if(pathname !== "/loginRegForget/login") {
                replace({ pathname: '/loginRegForget/login' });
            }
        }
    }

    // if(navigator.userAgent.indexOf("MSIE") >= 0) {
    //     return (
    //         <Forie />
    //     );
    // }

    return  <Router history={ history }>
                <Route path="/" getComponents={CommonComponents}>
                    <IndexRedirect to="/loginRegForget/login" />
                    <Route getComponents={wrap}>

                        <Route path="loginRegForget">
                            <Route path="login" getComponents={loginComponent}>
                            </Route>
                            <Route path="reg" getComponents={regComponent}>
                            </Route>
                            <Route path="forget" getComponents={forgetComponent}>
                            </Route>
                        </Route>

                        <Route path="coldChain">
                            <IndexRedirect to="/coldChain/todoList" />
                            <Route getComponents={leftNav}>
                                <Route path="draftBox" getComponents={draftBoxComponent} onEnter={loginAuth}></Route>
                                <Route path="todoList" getComponents={todoListComponent} onEnter={loginAuth}></Route>
                                <Route path="businessTypes" getComponents={businessTypes} onEnter={loginAuth}></Route>
                                <Route path="generationofmining" getComponents={generationofmining} onEnter={loginAuth}></Route>
                                <Route path="theorders" getComponents={theorders} onEnter={loginAuth}></Route>
                                <Route path="theordersdetail" getComponents={theordersdetail} onEnter={loginAuth}></Route>

                                <Route path="mypick" getComponents={mypickComponent} onEnter={loginAuth}></Route>
                                <Route path="pickcenter" getComponents={pickcenterComponent} onEnter={loginAuth}></Route>
                                <Route path="ontheway" getComponents={onthewayComponent} onEnter={loginAuth}></Route>
                                <Route path='pickDetail/:id' getComponents={pickDetailComponent} onEnter={loginAuth}></Route>
                            </Route>
                            <Route path="tradeAgent" getComponents={tradeAgent} onEnter={loginAuth}></Route>
                            <Route path="tradeAgentDeatil" getComponents={tradeAgentDeatil} onEnter={loginAuth}></Route>
                        </Route>

                    </Route>
                </Route>
            </Router>
}
