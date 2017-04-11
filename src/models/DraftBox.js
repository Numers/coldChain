/**
 * Created by baolicheng on 2017/3/31.
 */
import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';
import {routerRedux} from 'dva/router';

const initState = {
    dataSource:'',
    currentPage:'',
    perPage:10,
    totalPage:'',
};

export default {
    namespace:'draftBox',

    state:initState,

    subscriptions: {
        setup({dispatch,history}) {
            history.listen(location => {
                if(location.pathname === '/coldChain/draftBox') {
                    dispatch({
                        type:'resetState',
                        payload:{}
                    });

                    dispatch({
                        type:'renderList',
                        payload:{
                            page:1,
                            per:10,
                            contract_no:'',
                            pi_no:'',
                            order_type:'',
                            is_draft:1,
                        }
                    });
                }
            });
        },
    },

    effects: {
        *renderList({payload},{call,put,select})
        {
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65006,
                    msg:"web",
                    status:1,
                    data:payload,
                }
            }

            yield put({ type: 'spin/showLoading' });
            const {data} = yield call(axios,'/api/refll/financelist',options);
            if(data && data.status === 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updateState',
                        payload: {
                            dataSource:data.data && data.data.data || [],
                            currentPage:data.data && data.data.current,
                            totalPage:data.data && data.data.total,
                            ...payload
                        }
                    })
                } else {
                    message.error('获取详情数据失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取详情数据失败！');
            }
        },

        // *setTableParams({payload},{call,put,select})
        // {
        //     yield put({
        //         type:'renderList',
        //         payload:{...payload,is_draft:1,page:1,
        //             per:10,},
        //     });
        // },

        // *tableOnChange({payload},{call,put,select})
        // {
        //     yield put({
        //         type:'renderList',
        //         payload:{...payload,is_draft:1},
        //     });
        // },

        *onDelete({payload},{call,put,select}){
            const {recordId,index,dataSource} = payload;
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65027,
                    msg:"web",
                    status:1,
                    data:{
                        "refinance_apply_id":recordId,
                    },
                }
            };
            yield put({ type: 'spin/showLoading' });
            const {data} = yield call(axios,'/api/refll/ref_delete',options);
            if(data && data.status === 1){
                yield put({ type: 'spin/hideLoading' });
                dataSource.splice(index,1);
                yield put({
                    type:'updateState',
                    payload:{
                        ...payload,
                        dataSource,
                    },
                });
            }else {
                yield put({ type: 'spin/hideLoading' });
                message.error('删除失败!');
            }
        }

    },

    reducers: {
        resetState(state,action){
            return {
                ...action.payload
            }
        },

        updateState(state,action){
            return{
                ...state,
                ...action.payload,
            }
        }
    }
}