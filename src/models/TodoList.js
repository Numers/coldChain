/**
 * Created by baolicheng on 2017/3/30.
 */
import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';
import {routerRedux} from 'dva/router';

message.config({
    top: 50,
    duration: 2,
});

const initState = {
    /*提货订单页面属性*/
    dataSourceForPickOrderTable:'',
    total:'',
    current:'',//current和last_id保持一致 current展示用 last_id请求用

    pi:'',
    sku_name:'',
    pagesize:10,
    last_id:1,//current和last_id保持一致 current展示用 last_id请求用


    /*融资订单页面属性*/
    dataSourceBig:'',
    dataSourceSmall:'',
    pageBig:1,
    pageSmall:1,
    showNewFin:false
};

export default {

    namespace: 'todoList',

    state: initState,

    subscriptions: {
        setup({dispatch,history}) {
            history.listen(location => {
                if(location.pathname === '/coldChain/todoList') {
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
                            todo:1,
                        }
                    });

                    dispatch({
                        type:'renderPickOrderTable',
                        payload:{
                            "pagesize":10,
                            "last_id":1,
                            "sku_name":'',
                            "pi":'',
                            "todo":1,
                        }
                    });
                }
            });
        },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问model数据
        *renderList({ payload }, { call, put ,select}) {

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65006,
                    msg:"web",
                    status:1,
                    data:{
                        ...payload,
                        "todo":1,
                    },
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/financelist',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    console.log(data.data);
                    yield put({
                        type:'updateState',
                        payload: {
                            dataSourceBig:data.data && data.data.data || [],
                            pageBig:data.data && data.data.current,
                            totalAll:data.data && data.data.total,
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

        *lookForAllFn({ payload }, { call, put ,select}) {
            //查询
            yield put({
                type:'renderList',
                payload:{
                    ...payload
                }
            });
        },
        *pageAll({ payload }, { call, put ,select}) {
            //分页
            yield put({
                type:'renderList',
                payload:{
                    ...payload
                }
            });
        },
        *renderSmallList({ payload }, { call, put ,select}) {

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65014,
                    msg:"web",
                    status:1,
                    data:payload,
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/financegoodslist',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    console.log(data.data);
                    yield put({
                        type:'updateState',
                        payload: {
                            dataSourceSmall:data.data && data.data.data || [],
                            pageSmall:data.data && data.data.current,
                            localStorageData:payload,
                            totalSmall:data.data && data.data.total,
                            //...payload,
                            showNewFin:true,
                            order_type_id:payload.order_type_id,
                            refinance_apply_id_choose:payload.refinance_apply_id,
                            showtablefloat:true,
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
        *lookForSmallFn({ payload }, { call, put ,select}) {
            //查询
            yield put({
                type:'renderSmallList',
                payload:{
                    ...payload
                }
            });
        },
        *pageSmallfn({ payload }, { call, put ,select}) {
            //分页
            yield put({
                type:'renderSmallList',
                payload:{
                    ...payload,
                }
            });
        },
        *gotoFin({ payload }, { call, put ,select}) {
            const localStorageData = payload.localStorageData;
            if(localStorageData.order_type_id == 1) {
                yield put(routerRedux.push({pathname:'/coldChain/generationofmining',query:{order_type:1,newFin:true}}));
            }else if(localStorageData.order_type_id == 2) {
                yield put(routerRedux.push({pathname:'/coldChain/generationofmining',query:{order_type:2,newFin:true}}));
            }
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
        },



        /*以下为提货订单列表函数*/
        *setTableParams({ payload }, { call, put ,select}) {
            yield put({
                type:'renderPickOrderTable',
                payload:payload
            });
        },
        *renderPickOrderTable({payload},{call,put,select}){
            yield put({
                type:'savepayload',
                payload:payload
            });
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:64004,
                    msg:"web",
                    status:1,
                    data:payload,
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }
            const { data } = yield call(axios,'/api/ll/get_pick_up_list',options);

            if(data && data.status) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updateTableData',
                        payload:data.data
                    });
                } else {
                    message.error('获取列表数据失败');
                }

            }else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取列表数据失败');
            }
        },

        *tableOnChange({ payload }, { call, put ,select}) {
            const todoList = yield select(({ todoList }) =>  {
                return {...todoList}
            });

            const sku_name = todoList.sku_name;
            const pi = todoList.pi;
            const pagesize = todoList.pagesize;
            const last_id = payload.current;

            yield put({
                type:'renderPickOrderTable',
                payload:{
                    sku_name,
                    pi,
                    pagesize,
                    last_id,
                    todo:1
                }
            });
        },
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
        },
        updateTableData(state,action) {
            const dataSource = formatdata({
                type:'updateTableData',
                data:action.payload.data
            });
            const current = action.payload.current;
            const total = action.payload.total;
            return {...state,dataSourceForPickOrderTable:dataSource,current:current,total:total}
        },
        savepayload(state,action) {
            return {...state,...action.payload}
        }
    }

};
