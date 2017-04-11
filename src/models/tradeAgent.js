import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';

message.config({
    top: 50,
    duration: 2,
});

const initState = {
    current:'1'
};

export default {

    namespace: 'tradeAgent',

    state: initState,

    subscriptions: {
        setup({dispatch,history}) {
            history.listen(location => {
                if (location.pathname === '/coldChain/tradeAgent') {

                    dispatch({
                        type:'resetState',
                        payload:{}
                    });

                    dispatch({
                        type:'render',
                        payload:{
                            page:1,
                            per:10,
                            pi_no:'',
                            order_type:''
                        }
                    });
                }
            });
        },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问model数据
        *render({ payload }, { call, put ,select}) {
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65010,
                    msg:"web",
                    status:1,
                    data:payload,
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/tradeagentlist',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    const datavalue = data.data && data.data.data || [];
                    const current = data.data && data.data.current || 1;

                    yield put({
                        type:'updateState',
                        payload:{
                            datasource:datavalue,
                            ...payload,
                            current:current,
                            total:data.data && data.data.total
                        }
                    });

                } else {
                    message.error('获取详情数据失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取详情数据失败！');
            }
        },
        *queryrender({ payload }, { call, put ,select}) {
            yield put({
                type:'render',
                payload:payload
            });
        },
        *setrate({ payload }, { call, put ,select}) {
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:68001,
                    msg:"web",
                    status:1,
                    data:{
                    }
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/common/exchange_rate',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updateState',
                        payload:{
                            selectRate:data.data || [],
                        }
                    });
                } else {
                    message.error('获取汇率失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取汇率失败！');
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
