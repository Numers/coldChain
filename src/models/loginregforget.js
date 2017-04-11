import { axios } from '../services/queryData';
import { message } from 'antd';

message.config({
    top: 50,
    duration: 2,
});

import hex_md5 from 'md5';

export default {

    namespace: 'loginregforget',

    state: {
        loading:false,
        isLogin:false,
    },

    subscriptions: {
        setup({dispatch, history}) {

        },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问其它model

        *login({ payload }, { call, put }) {

            const options = {
                data:{
                    code:10001,
                    status:1,
                    msg:'web',
                    data:{
                        mobile:payload.mobile,
                        password:hex_md5(payload.password)
                    }
                },
                method:'post'
            };


            yield put({ type: 'spin/showLoading' });
            const {data} = yield call(axios,'/user/login',options);

            if(data) {
                yield put({
                    type: 'spin/hideLoading'
                });
                const newdata = data.data;
                if(data.status == 1) {
                    yield put({
                       type:'getFinal',
                        payload:newdata
                    });


                } else {
                    message.error( data.msg || '登录失败！');
                }

            }else {
                yield put({
                    type: 'spin/hideLoading'
                });
                message.error('登录失败！');
            }
        },
        *getFinal({payload},{put,call}) {
            yield put({
                type: 'spin/showLoading'
            });
            const token = payload.token;
            const options = {
                data:{
                    code:65021,
                    msg:"web",
                    status:1,
                },
                headers:{'Acc-Token':token},
                method:'post'
            };

            const {data} = yield call(axios,'/api/refll/amt_query',options);
            if(data && data.status == 1) {
                yield put({
                    type: 'spin/hideLoading'
                });

                yield put({
                    type:'updateState',
                    payload:{
                        ...data.data,
                        ...payload
                    }
                });
            } else {
                yield put({
                    type: 'spin/hideLoading'
                });
                message.error('获取融资金额失败！');
            }

        },
        logout({payload},{put}) {
            const history = payload.history;
            localStorage.clear();

            put({
                type:'updateIsLogin',
                payload:false
            });

            setTimeout(() => {
                history.push('/loginRegForget/login');
            },500);
        }
    },

    reducers: {
        updateState(state,action) {
            const data = action.payload;

            const platform = data && data.business_use && data.business_use.platform;
            const monomer =  data && data.business_use && data.business_use.monomer;
            const ll = data && data.business_use && data.business_use.ll;
            if(data) {
                if(platform && typeof(platform) == 'object') {
                    localStorage.setItem('platform',JSON.stringify(platform) || '');
                }

                if(monomer && typeof(monomer) == 'object') {
                    localStorage.setItem('monomer',JSON.stringify(monomer) || '');
                }

                if(ll && typeof(ll) == 'object') {
                    localStorage.setItem('ll',JSON.stringify(ll) || '');
                }

                localStorage.setItem('token',data.token||'');
                localStorage.setItem('company',data.company||'');
                localStorage.setItem('name',data.name||'');
                localStorage.setItem('role',data.role||'');
                localStorage.setItem('c_id',data.c_id||'');
                localStorage.setItem('auth',data.auth && data.auth[0] || "");
                localStorage.setItem('business',data.business && data.business[0] || "");

                localStorage.setItem('prdcreditamt',data.prdcreditamt || "");
                localStorage.setItem('usedamt',data.usedamt || "");
                localStorage.setItem('availamt',data.availamt || "");
                localStorage.setItem('enddate',data.enddate || "");
            }

            return {...state,isLogin:true}
        },
        updateIsLogin(state,action) {
            return {...state,isLogin:action.payload}
        }
    }

};
