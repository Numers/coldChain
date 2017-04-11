import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
message.config({
    top: 50,
    duration: 2,
});

let initState = {

};

export default {

    namespace: 'tradeAgentdetail',

    state: initState,

    subscriptions: {
        setup({dispatch,history}) {
            history.listen(location => {
                if (location.pathname == '/coldChain/tradeAgentDeatil') {

                    dispatch({
                        type:'resetState',
                        payload:{}
                    });

                    dispatch({
                        type:'render',
                        payload:{
                            ...location.query
                        }
                    });

                }
            });
        },
    },

    effects: {
        *render({ payload }, { call, put ,select}) {

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65011,
                    msg:"web",
                    status:1,
                    data:{
                        id:payload.id
                    },
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/tradeagentinfo',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {

                    const activeKey = formatdata({
                        type:'activeKeyForTrade',
                        data:payload && payload.flag || 1
                    });

                    const tradeStatus = formatdata({
                        type:'tradeStatus',
                        data:payload && payload.flag
                    })

                    yield put({
                        type:'updateState',
                        payload:{
                            ...data.data,
                            ...payload,
                            activeKey:activeKey,
                            tradeStatus:tradeStatus
                        }
                    });

                } else {
                    message.error('请求失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('请求失败！');
            }
        },
        *uploadSubmit({ payload }, { call, put ,select}) {

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65016,
                    msg:"web",
                    status:1,
                    data:payload
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/savefile',options);

            if(data && data.status == 1) {

                yield put({ type: 'spin/hideLoading' });
                message.success('提交成功！');



                yield put(routerRedux.push('/coldChain/tradeAgent'));

            } else {

                yield put({ type: 'spin/hideLoading' });
                message.error('请求失败！');

            }
        },
        *uploadSubmitGH({ payload }, { call, put ,select}) {
            const payload1 = payload.payload1;
            const payload2 = payload.payload2;

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65017,
                    msg:"web",
                    status:1,
                    data:payload1
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/saveforeignexchange',options);

            if(data && data.status == 1) {

                yield put({ type: 'spin/hideLoading' });

                yield put({
                    type:'uploadSubmit',
                    payload:payload2
                });


            } else {

                yield put({ type: 'spin/hideLoading' });
                message.error('请求失败！');

            }
        },
        *updateCI({ payload }, { call, put ,select}) {

            let queryurl = '';
            let queryCode = '';
            if(payload.url) {
                queryurl = payload.url;
                queryCode = 65012
            }else {
                queryurl = '/api/refll/saveci';
                queryCode = 65015
            }

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:queryCode,
                    msg:"web",
                    status:1,
                    data:payload
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,queryurl,options);

            if(data && data.status == 1) {

                yield put({ type: 'spin/hideLoading' });
                message.success('提交成功！');

                yield put({
                    type:'updateState',
                    payload:{
                        activeKey:'2'
                    }
                });

            } else {

                yield put({ type: 'spin/hideLoading' });
                message.error('请求失败！');

            }
        }
    },
    reducers: {
        resetState(state,action){
            return {
                ...action.payload
            }
        },
        updateState(state,action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }

};
